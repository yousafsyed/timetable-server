import { Injectable, Inject } from '@nestjs/common';
import { Schedule } from 'src/Domain/schedule';
import { SCHEDULE_REPOSITORY_TOKEN } from 'src/Domain/schedule.respository';
import { ScheduleRepository } from 'src/Domain/schedule.respository';
import { CreateScheduleRequest } from './CreateScheduleRequest';
import { ScheduleDateTime } from 'src/Domain/ValueObjects/schedule.date.time';
import { ScheduleDescription } from 'src/Domain/ValueObjects/schedule.description';

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
