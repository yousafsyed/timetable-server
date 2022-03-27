import { ScheduleCriteria } from 'src/Domain/ScheduleCollectionBuilder';
export class CreateScheduleFromDateRangeRequest {
  constructor(private scheduleCriteria: ScheduleCriteria) {}
  getScheduleCriteria(): ScheduleCriteria {
    return this.scheduleCriteria;
  }
}
