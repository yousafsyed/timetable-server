import { Injectable, Inject } from '@nestjs/common';
import { Schedule } from 'src/Domain/Schedule';
import {
  ScheduleCollectionBuilder,
  SCHEDULE_COLLECTION_BUILDER_TOKEN,
} from 'src/Domain/ScheduleCollectionBuilder';
import { CreateScheduleFromDateRangeRequest } from './CreateScheduleFromDateRangeRequest';
@Injectable()
export class CreateScheduleFromDateRangeUseCase {
  constructor(
    @Inject(SCHEDULE_COLLECTION_BUILDER_TOKEN)
    private scheduleBuilder: ScheduleCollectionBuilder,
  ) {}
  execute(request: CreateScheduleFromDateRangeRequest): Schedule[] {
    return this.scheduleBuilder.build(request.getScheduleCriteria());
  }
}
