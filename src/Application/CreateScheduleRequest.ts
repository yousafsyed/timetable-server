import { IsDateString, IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateScheduleRequest {
  @IsDateString()
  dateTime: string;
  @IsNotEmpty()
  @IsString()
  scheduleDescription: string;
  @IsNotEmpty()
  @IsNumber()
  scheduleStatus: number;
}
