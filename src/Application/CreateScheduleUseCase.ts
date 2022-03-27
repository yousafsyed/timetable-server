import { Injectable, Inject } from '@nestjs/common';
import { Schedule } from '../Domain/Schedule';
import {
  ScheduleRepository,
  SCHEDULE_REPOSITORY_TOKEN,
} from '../Domain/ScheduleRepository';
import { CreateScheduleRequest } from './CreateScheduleRequest';
import { ScheduleDateTime } from '../Domain/ValueObjects/ScheduleDateTime';
import { ScheduleDescription } from '../Domain/ValueObjects/ScheduleDescription';

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
