import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScheduleDocument = ScheduleModel & Document;

@Schema()
export class ScheduleModel {
  @Prop({ required: true, index: true })
  dateTime: Date;

  @Prop({ required: true })
  scheduleDescription: string;

  @Prop({ required: true })
  scheduleStatus: number;
}

export const ScheduleSchema = SchemaFactory.createForClass(ScheduleModel);
