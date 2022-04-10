import { Injectable, Inject } from '@nestjs/common';
import { Schedule } from 'src/Domain/Schedule';

import {
  ScheduleRepository,
  SCHEDULE_REPOSITORY_TOKEN,
} from '../Domain/ScheduleRepository';
import { GetScheduleByMonthRequest } from './GetScheduleByMonthRequest';
@Injectable()
export class GetScheduleByMonthUseCase {
  constructor(
    @Inject(SCHEDULE_REPOSITORY_TOKEN)
    private scheduleRepository: ScheduleRepository,
  ) {}
  execute(request: GetScheduleByMonthRequest): Promise<Schedule[]> {
    return this.scheduleRepository.getScheduleByMonth(
      request.getDate(),
      request.getUserId(),
    );
  }
}
