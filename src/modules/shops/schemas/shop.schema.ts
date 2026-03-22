import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ShopDocument = Shop & Document;

class PaymentSettings {
  @Prop({ default: true })
  codEnabled: boolean;

  @Prop()
  razorpayKeyId?: string;

  @Prop()
  razorpayKeySecret?: string;
}

class ShopSettings {
  @Prop({ type: PaymentSettings, default: () => ({ codEnabled: true }) })
  payment: PaymentSettings;

  @Prop([String])
  deliveryOptions: string[];
}

@Schema({ timestamps: true })
export class Shop {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, unique: true })
  subdomain: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  ownerId: string;

  @Prop({ type: ShopSettings, default: () => ({}) })
  settings: ShopSettings;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
