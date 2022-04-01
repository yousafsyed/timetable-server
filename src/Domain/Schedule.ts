import { ScheduleDescription } from './ValueObjects/ScheduleDescription';
import { ScheduleDateTime } from './ValueObjects/ScheduleDateTime';
import { ScheduleStatus } from './ValueObjects/ScheduleStatus';
import { ScheduleId } from './ValueObjects/ScheduleId';
import { UserId } from './ValueObjects/UserId';

export type ScheduleDTO = {
  scheduleId: string;
  dateTime: Date;
  scheduleDescription: string;
  scheduleStatus: number;
  userId: string;
};
export class Schedule {
  constructor(
    private scheduleId: ScheduleId,
    private dateTime: ScheduleDateTime,
    private scheduleDescription: ScheduleDescription,
    private scheduleStatus: ScheduleStatus,
    private userId: UserId,
  ) {}

  getDateTime(): ScheduleDateTime {
    return this.dateTime;
  }

  toJSON(): ScheduleDTO {
    return {
      scheduleId: this.scheduleId.value(),
      dateTime: this.dateTime.value(),
      scheduleDescription: this.scheduleDescription.value(),
      scheduleStatus: this.scheduleStatus,
      userId: this.userId.value(),
    };
  }
}
