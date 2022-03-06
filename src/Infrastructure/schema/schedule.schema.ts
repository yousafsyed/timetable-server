import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScheduleDocument = Schedules & Document;

@Schema()
export class Schedules {
  @Prop()
  dateTime: Date;

  @Prop()
  scheduleDescription: string;

  @Prop()
  scheduleStatus: number;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedules);
