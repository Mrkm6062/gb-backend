import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: 0 })
  stock: number;

  @Prop([String])
  images: string[];

  @Prop()
  category: string;

  @Prop({ type: Types.ObjectId, ref: 'Shop', required: true, index: true })
  shopId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
