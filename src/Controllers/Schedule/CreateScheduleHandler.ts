import { Controller, UseFilters, Body, Post } from '@nestjs/common';
import { CreateScheduleUseCase } from '../../Application/CreateScheduleUseCase';
import { CreateScheduleRequest } from '../../Application/CreateScheduleRequest';
import { Schedule } from '../../Domain/schedule';
import { MongoErrorFilters } from '../../Infrastructure/ExceptionFilters/MongoErrorFilters';

@Controller()
export class CreateScheduleHandler {
  constructor(private readonly usecase: CreateScheduleUseCase) {}

  @Post('create')
  @UseFilters(MongoErrorFilters)
  async create(
    @Body() createScheduleRequest: CreateScheduleRequest,
  ): Promise<Schedule> {
    return this.usecase.execute(createScheduleRequest);
  }
}
