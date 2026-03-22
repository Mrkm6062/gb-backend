import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ type: Types.ObjectId, ref: 'Shop', required: false })
  shopId: string;

  @Prop({ required: true, enum: ['admin', 'staff'], default: 'admin' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
