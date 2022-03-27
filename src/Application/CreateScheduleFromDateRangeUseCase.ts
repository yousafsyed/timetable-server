import { Injectable, Inject } from '@nestjs/common';
import { Schedule } from 'src/Domain/Schedule';
import {
  ScheduleCollectionBuilder,
  SCHEDULE_COLLECTION_BUILDER_TOKEN,
} from 'src/Domain/ScheduleCollectionBuilder';
import {
  ScheduleRepository,
  SCHEDULE_REPOSITORY_TOKEN,
} from '../Domain/ScheduleRepository';
import { CreateScheduleFromDateRangeRequest } from './CreateScheduleFromDateRangeRequest';
@Injectable()
export class CreateScheduleFromDateRangeUseCase {
  constructor(
    @Inject(SCHEDULE_COLLECTION_BUILDER_TOKEN)
    private scheduleBuilder: ScheduleCollectionBuilder,
    @Inject(SCHEDULE_REPOSITORY_TOKEN)
    private scheduleRepository: ScheduleRepository,
  ) {}
  execute(request: CreateScheduleFromDateRangeRequest): Promise<Schedule[]> {
    return this.scheduleRepository.bulkPersist(
      this.scheduleBuilder.build(request.getScheduleCriteria()),
    );
  }
}
