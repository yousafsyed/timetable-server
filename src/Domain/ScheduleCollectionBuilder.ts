import { ScheduleableHour } from './ValueObjects/ScheduleableHour';
import { randomUUID } from 'crypto';
import {
  IsEnum,
  IsString,
  ValidateNested,
  IsNotEmpty,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Schedule } from './Schedule';
import { ScheduleDescription } from './ValueObjects/ScheduleDescription';
import { ScheduleStatus } from './ValueObjects/ScheduleStatus';
import { ScheduleDateTime } from './ValueObjects/ScheduleDateTime';
import { ScheduleId } from './ValueObjects/ScheduleId';
import { UserId } from './ValueObjects/UserId';
export const SCHEDULE_COLLECTION_BUILDER_TOKEN = Symbol(
  'ScheduleCollectionBuilder',
);
export type ScheduleCriteria = {
  startDate: Date;
  endDate: Date;
  weeklySchedule: Array<ScheduleByWeekDay>;
  userId: UserId;
};

export enum WeekDay {
  Sunday,
  Monday,
  Tuesday,
  Wedenesday,
  Thursday,
  Friday,
  Saturday,
}
export class ScheduleByWeekDay {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ScheduleByHour)
  scheduleByHour: Array<ScheduleByHour>;
  @IsNotEmpty()
  @IsEnum(WeekDay)
  dayOfWeek: WeekDay;
}

export class ScheduleByHour {
  @IsEnum(ScheduleableHour)
  hour: ScheduleableHour;
  @IsString()
  description: string;
}

export class ScheduleCollectionBuilder {
  build(scheduleCriteria: ScheduleCriteria): Schedule[] {
    const scheduleAbleWeekDays = scheduleCriteria.weeklySchedule.map(
      (weeklySchedule: ScheduleByWeekDay) => {
        return weeklySchedule.dayOfWeek;
      },
    );
    const dates = this.getAllDatesFromRange(
      scheduleCriteria.startDate,
      scheduleCriteria.endDate,
    ).filter((date: Date) => scheduleAbleWeekDays.includes(date.getDay()));

    return dates
      .map((date: Date): Schedule[] => {
        const [scheduleForCurrentDay] = scheduleCriteria.weeklySchedule.filter(
          (scheduleByWeekDay: ScheduleByWeekDay) => {
            return date.getDay() === scheduleByWeekDay.dayOfWeek;
          },
        );
        return scheduleForCurrentDay.scheduleByHour.map(
          (scheduleByHour: ScheduleByHour): Schedule => {
            const scheduleDateTime = new ScheduleDateTime(
              new Date(date.setHours(scheduleByHour.hour)),
            );
            const schedule = new Schedule(
              new ScheduleId(randomUUID()),
              scheduleDateTime,
              new ScheduleDescription(scheduleByHour.description),
              ScheduleStatus.PENDING,
              scheduleCriteria.userId,
            );
            return schedule;
          },
        );
      })
      .flat();
  }

  private getAllDatesFromRange(startDate: Date, endDate: Date): Array<Date> {
    const dates: Array<Date> = [];
    const currentDate = startDate;
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }
}
