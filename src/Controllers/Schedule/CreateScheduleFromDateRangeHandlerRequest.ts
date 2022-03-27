import {
  IsDateString,
  IsNotEmpty,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ScheduleByWeekDay } from 'src/Domain/ScheduleCollectionBuilder';
export class CreateScheduleFromDateRangeHandlerRequest {
  @IsNotEmpty()
  @IsDateString()
  startDate: string;
  @IsNotEmpty()
  @IsDateString()
  endDate: string;
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ScheduleByWeekDay)
  weeklySchedule: ScheduleByWeekDay[];
}
