import { Injectable, Inject } from '@nestjs/common';
import { Schedule } from '../Domain/schedule';
import { SCHEDULE_REPOSITORY_TOKEN } from '../Domain/schedule.respository';
import { ScheduleRepository } from '../Domain/schedule.respository';
import { CreateScheduleRequest } from './CreateScheduleRequest';
import { ScheduleDateTime } from '../Domain/ValueObjects/schedule.date.time';
import { ScheduleDescription } from '../Domain/ValueObjects/schedule.description';

@Injectable()
export class CreateScheduleUseCase {
  constructor(
    @Inject(SCHEDULE_REPOSITORY_TOKEN)
    private scheduleRepository: ScheduleRepository,
  ) {}

  execute(CreateScheduleRequest: CreateScheduleRequest): Promise<Schedule> {
    return this.scheduleRepository.persist(
      new Schedule(
        new ScheduleDateTime(new Date(CreateScheduleRequest.dateTime)),
        new ScheduleDescription(CreateScheduleRequest.scheduleDescription),
        CreateScheduleRequest.scheduleStatus,
      ),
    );
  }
}
