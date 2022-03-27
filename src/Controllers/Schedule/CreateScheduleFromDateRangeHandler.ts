import { CreateScheduleFromDateRangeHandlerRequest } from './CreateScheduleFromDateRangeHandlerRequest';
import { Controller, UseFilters, Body, Post } from '@nestjs/common';
import { CreateScheduleFromDateRangeRequest } from 'src/Application/CreateScheduleFromDateRangeRequest';
import { CreateScheduleFromDateRangeUseCase } from 'src/Application/CreateScheduleFromDateRangeUseCase';
import { Schedule } from '../../Domain/Schedule';
import { ScheduleCriteria } from 'src/Domain/ScheduleCollectionBuilder';
import { MongoErrorFilters } from '../../Infrastructure/ExceptionFilters/MongoErrorFilters';

@Controller({
  version: '1',
})
export class CreateScheduleFromDateRangeHandler {
  constructor(private readonly usecase: CreateScheduleFromDateRangeUseCase) {}

  @Post('schedule')
  @UseFilters(MongoErrorFilters)
  create(
    @Body() createScheduleRequest: CreateScheduleFromDateRangeHandlerRequest,
  ): Promise<Schedule[]> {
    const request: CreateScheduleFromDateRangeRequest =
      new CreateScheduleFromDateRangeRequest(
        this.makeScheduleCriteria(createScheduleRequest),
      );

    return this.usecase.execute(request);
  }

  private makeScheduleCriteria(
    createScheduleRequest: CreateScheduleFromDateRangeHandlerRequest,
  ): ScheduleCriteria {
    return {
      startDate: new Date(createScheduleRequest.startDate),
      endDate: new Date(createScheduleRequest.endDate),
      weeklySchedule: createScheduleRequest.weeklySchedule,
    };
  }
}
