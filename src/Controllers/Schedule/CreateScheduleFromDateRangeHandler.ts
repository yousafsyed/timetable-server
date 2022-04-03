import { CreateScheduleFromDateRangeHandlerRequest } from './CreateScheduleFromDateRangeHandlerRequest';
import {
  Controller,
  UseFilters,
  Body,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateScheduleFromDateRangeRequest } from 'src/Application/CreateScheduleFromDateRangeRequest';
import { CreateScheduleFromDateRangeUseCase } from 'src/Application/CreateScheduleFromDateRangeUseCase';
import { Schedule } from '../../Domain/Schedule';
import { ScheduleCriteria } from 'src/Domain/ScheduleCollectionBuilder';
import { MongoErrorFilters } from '../../Infrastructure/ExceptionFilters/MongoErrorFilters';
import { UserId } from 'src/Domain/ValueObjects/UserId';
import { JwtAuthGuard } from '../User/JwtAuthGuard';
import { UserPublicDTO } from 'src/Domain/User';

@Controller({
  version: '1',
})
export class CreateScheduleFromDateRangeHandler {
  constructor(private readonly usecase: CreateScheduleFromDateRangeUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post('schedule')
  @UseFilters(MongoErrorFilters)
  create(
    @Body() createScheduleRequest: CreateScheduleFromDateRangeHandlerRequest,
    @Request() req,
  ): Promise<Schedule[]> {
    const request: CreateScheduleFromDateRangeRequest =
      new CreateScheduleFromDateRangeRequest(
        this.makeScheduleCriteria(createScheduleRequest, req.user),
      );

    return this.usecase.execute(request);
  }

  private makeScheduleCriteria(
    createScheduleRequest: CreateScheduleFromDateRangeHandlerRequest,
    user: any,
  ): ScheduleCriteria {
    return {
      startDate: new Date(createScheduleRequest.startDate),
      endDate: new Date(createScheduleRequest.endDate),
      weeklySchedule: createScheduleRequest.weeklySchedule,
      userId: new UserId(user.userId),
    };
  }
}
