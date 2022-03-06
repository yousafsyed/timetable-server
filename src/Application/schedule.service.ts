import { Injectable, Inject } from '@nestjs/common';
import { Schedule } from 'src/Domain/schedule';
import { SCHEDULE_REPOSITORY_TOKEN } from 'src/Domain/schedule.respository';
import { ScheduleRepository } from 'src/Domain/schedule.respository';
import { CreateScheduleDto } from './CreateScheduleDto';
import { ScheduleDateTime } from 'src/Domain/ValueObjects/schedule.date.time';
import { ScheduleDescription } from 'src/Domain/ValueObjects/schedule.description';

@Injectable()
export class ScheduleService {
  constructor(
    @Inject(SCHEDULE_REPOSITORY_TOKEN)
    private scheduleRepository: ScheduleRepository,
  ) {}
  getWelcome(): string {
    return 'Welcome to schedule manager';
  }

  createNewSchedule(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleRepository.persist(
      new Schedule(
        new ScheduleDateTime(new Date(createScheduleDto.dateTime)),
        new ScheduleDescription(createScheduleDto.scheduleDescription),
        createScheduleDto.scheduleStatus,
      ),
    );
  }
}
