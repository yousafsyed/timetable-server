import { ScheduleableHourList } from './ScheduleableHour';
export class ScheduleDateTime {
  private dateTime: Date;
  private readonly timeZoneOffset = 0;

  constructor(dateTime: Date) {
    this.validate(dateTime);
    this.dateTime = dateTime;
  }

  private validate(dateTime: Date) {
    if (
      dateTime.getTimezoneOffset() != this.timeZoneOffset ||
      !ScheduleableHourList.includes(dateTime.getHours())
    ) {
      throw new Error('Invalid DateTime');
    }
  }

  value(): Date {
    return this.dateTime;
  }

  equals(dateTime: Date): boolean {
    return (
      this.dateTime.getTime() === dateTime.getTime() &&
      this.dateTime.getTimezoneOffset() === dateTime.getTimezoneOffset()
    );
  }
}
