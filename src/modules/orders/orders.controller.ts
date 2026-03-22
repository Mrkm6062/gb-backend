import { Controller, Post, Get, Put, Body, Param, UseGuards, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';
import { Product, ProductDocument } from '../products/schemas/product.schema';

@Controller()
export class OrdersController {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  // ================= STOREFRONT APIs =================
  @Post('storefront/orders')
  async placeOrder(@Body() body: any, @CurrentTenant() tenantId: string) {
    // Validate that products belong to the tenant and have stock
    let totalAmount = 0;
    for (const item of body.items) {
      const product = await this.productModel.findOne({ _id: item.productId, shopId: tenantId });
      if (!product) throw new BadRequestException(`Product ${item.productId} invalid or unavailable`);
      if (product.stock < item.quantity) throw new BadRequestException(`Insufficient stock for ${product.name}`);
      
      // Calculate total securely from DB prices
      totalAmount += product.price * item.quantity;
      item.price = product.price; // Enforce source of truth
      
      // Decrement stock
      await this.productModel.updateOne({ _id: product._id }, { $inc: { stock: -item.quantity } });
    }

    const order = new this.orderModel({
      ...body,
      totalAmount,
      shopId: tenantId,
    });
    return order.save();
  }

  // ================= ADMIN APIs =================
  @UseGuards(JwtAuthGuard)
  @Get('admin/orders')
  async getAdminOrders(@CurrentTenant() tenantId: string) {
    return this.orderModel.find({ shopId: tenantId }).sort({ createdAt: -1 }).exec();
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/orders/:id/status')
  async updateOrderStatus(
    @Param('id') id: string, 
    @Body('status') status: string, 
    @CurrentTenant() tenantId: string
  ) {
    return this.orderModel.findOneAndUpdate(
      { _id: id, shopId: tenantId }, // Strict bounds!
      { status },
      { new: true }
    );
  }
}
