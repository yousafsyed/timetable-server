import { Controller, UseFilters, Body, Post } from '@nestjs/common';
import { CreateScheduleUseCase } from 'src/Application/CreateScheduleUseCase';
import { CreateScheduleRequest } from 'src/Application/CreateScheduleRequest';
import { Schedule } from 'src/Domain/schedule';
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
