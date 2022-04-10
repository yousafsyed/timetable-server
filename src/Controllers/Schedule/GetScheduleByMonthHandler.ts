import { CreateScheduleFromDateRangeHandlerRequest } from './CreateScheduleFromDateRangeHandlerRequest';
import {
  Controller,
  UseFilters,
  Query,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { GetScheduleByMonthRequest } from 'src/Application/GetScheduleByMonthRequest';
import { GetScheduleByMonthUseCase } from 'src/Application/GetScheduleByMonthUseCase';
import { Schedule } from '../../Domain/Schedule';
import { MongoErrorFilters } from '../../Infrastructure/ExceptionFilters/MongoErrorFilters';
import { UserId } from 'src/Domain/ValueObjects/UserId';
import { JwtAuthGuard } from '../User/JwtAuthGuard';
import { GetScheduleByMonthHandlerRequest } from './GetScheduleByMonthHandlerRequest';

@Controller({
  version: '1',
})
export class GetScheduleByMonthHandler {
  constructor(private readonly usecase: GetScheduleByMonthUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get('schedule')
  @UseFilters(MongoErrorFilters)
  create(
    @Query() getScheduleByMonthHandlerRequest: GetScheduleByMonthHandlerRequest,
    @Request() req,
  ): Promise<Schedule[]> {
    console.log(getScheduleByMonthHandlerRequest);
    return this.usecase.execute(
      new GetScheduleByMonthRequest(
        new Date(getScheduleByMonthHandlerRequest.date),
        new UserId(req.user.userId),
      ),
    );
  }
}
