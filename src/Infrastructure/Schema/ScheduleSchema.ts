import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScheduleDocument = Schedules & Document;

@Schema()
export class Schedules {
  @Prop({ required: true, index: true })
  dateTime: Date;

  @Prop({ required: true })
  scheduleDescription: string;

  @Prop({ required: true })
  scheduleStatus: number;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedules);
