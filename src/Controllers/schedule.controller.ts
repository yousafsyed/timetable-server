import { Controller, Get, Body, Post } from '@nestjs/common';
import { ScheduleService } from 'src/Application/schedule.service';
import { CreateScheduleDto } from 'src/Application/CreateScheduleDto';
import { Schedule } from 'src/Domain/schedule';

@Controller()
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  welcome(): string {
    return this.scheduleService.getWelcome();
  }

  @Post('create')
  async create(
    @Body() createScheduleDto: CreateScheduleDto,
  ): Promise<Schedule> {
    return this.scheduleService.createNewSchedule(createScheduleDto);
  }
}
