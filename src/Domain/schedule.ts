import { ScheduleDescription } from './ValueObjects/schedule.description';
import { ScheduleDateTime } from './ValueObjects/schedule.date.time';
import { ScheduleStatus } from './ValueObjects/schedule.status';

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
