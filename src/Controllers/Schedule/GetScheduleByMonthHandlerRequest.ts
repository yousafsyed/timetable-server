import { IsDateString, IsNotEmpty } from 'class-validator';

export class GetScheduleByMonthHandlerRequest {
  @IsNotEmpty()
  @IsDateString()
  date: string;
}
