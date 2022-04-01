import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserModel & Document;

@Schema()
export class UserModel {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  emailStatus: number;

  @Prop({ required: true })
  accountStatus: number;

  @Prop({ required: true })
  emailVerificationCode: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
