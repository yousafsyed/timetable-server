import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScheduleDocument = ScheduleModel & Document;

@Schema()
export class ScheduleModel {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  dateTime: Date;

  @Prop({ required: true })
  scheduleDescription: string;

  @Prop({ required: true })
  scheduleStatus: number;
}

export const ScheduleSchema = SchemaFactory.createForClass(ScheduleModel).index(
  { userId: 1, dateTime: 1 },
  { unique: true },
);
