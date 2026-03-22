import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';

@Controller()
export class ProductsController {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  // ================= ADMIN APIs =================
  // Protected by JWT. The @CurrentTenant() pulls shopId from req.user
  @UseGuards(JwtAuthGuard)
  @Post('admin/products')
  async createProduct(@Body() body: any, @CurrentTenant() tenantId: string) {
    const newProduct = new this.productModel({ ...body, shopId: tenantId });
    return newProduct.save();
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/products')
  async getAdminProducts(@CurrentTenant() tenantId: string) {
    return this.productModel.find({ shopId: tenantId }).exec();
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/products/:id')
  async updateProduct(@Param('id') id: string, @Body() body: any, @CurrentTenant() tenantId: string) {
    // Ensures a shop can only update ITS OWN products
    return this.productModel.findOneAndUpdate({ _id: id, shopId: tenantId }, body, { new: true });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admin/products/:id')
  async deleteProduct(@Param('id') id: string, @CurrentTenant() tenantId: string) {
    return this.productModel.findOneAndDelete({ _id: id, shopId: tenantId });
  }

  // ================= STOREFRONT APIs =================
  // Unprotected by JWT. Protected by TenantMiddleware (which parses subdomain)
  @Get('storefront/products')
  async getStorefrontProducts(@CurrentTenant() tenantId: string) {
    // Fetch products belonging ONLY to the shop accessed via subdomain
    return this.productModel.find({ shopId: tenantId, stock: { $gt: 0 } }).exec();
  }
}
