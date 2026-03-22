import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

class OrderItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: [OrderItem], required: true })
  items: OrderItem[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true, default: 'COD' })
  paymentMethod: string;

  @Prop({ required: true, enum: ['pending', 'confirmed', 'delivered'], default: 'pending' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Shop', required: true, index: true })
  shopId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
