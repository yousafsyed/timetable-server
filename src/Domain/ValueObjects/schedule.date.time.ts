export class ScheduleDateTime {
  private dateTime: Date;
  private readonly timeZoneOffset = 0;
  private validHours: Array<number> = [
    8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ];

  constructor(dateTime: Date) {
    this.validate(dateTime);
    this.dateTime = dateTime;
  }

  private validate(dateTime: Date) {
    if (
      dateTime.getTimezoneOffset() != this.timeZoneOffset ||
      !this.validHours.includes(dateTime.getHours())
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
