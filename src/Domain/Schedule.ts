import { ScheduleDescription } from './ValueObjects/ScheduleDescription';
import { ScheduleDateTime } from './ValueObjects/ScheduleDateTime';
import { ScheduleStatus } from './ValueObjects/ScheduleStatus';

export type ScheduleDTO = {
  dateTime: Date;
  scheduleDescription: string;
  scheduleStatus: number;
};
export class Schedule {
  private dateTime: ScheduleDateTime;
  private scheduleDescription: ScheduleDescription;
  private scheduleStatus: ScheduleStatus;

  constructor(
    dateTime: ScheduleDateTime,
    scheduleDescription: ScheduleDescription,
    scheduleStatus: ScheduleStatus,
  ) {
    this.dateTime = dateTime;
    this.scheduleDescription = scheduleDescription;
    this.scheduleStatus = scheduleStatus;
  }

  getDateTime(): ScheduleDateTime {
    return this.dateTime;
  }

  toJSON(): ScheduleDTO {
    return {
      dateTime: this.dateTime.value(),
      scheduleDescription: this.scheduleDescription.value(),
      scheduleStatus: this.scheduleStatus,
    };
  }
}
