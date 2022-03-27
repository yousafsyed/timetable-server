import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ScheduleDocument, Schedules } from './Schema/ScheduleSchema';
import { ScheduleRepository } from '../Domain/ScheduleRepository';
import { Schedule } from '../Domain/Schedule';
import { ScheduleDateTime } from '../Domain/ValueObjects/ScheduleDateTime';
import { ScheduleDescription } from '../Domain/ValueObjects/ScheduleDescription';
import { ScheduleStatus } from '../Domain/ValueObjects/ScheduleStatus';

@Injectable()
export class MongoScheduleRepository implements ScheduleRepository {
  constructor(
    @InjectModel(Schedules.name) private model: Model<ScheduleDocument>,
  ) {}
  getScheduleByMonth(dateTime: Date): Array<Schedule> {
    return [
      new Schedule(
        new ScheduleDateTime(dateTime),
        new ScheduleDescription('sas'),
        ScheduleStatus.ABSENT,
      ),
    ];
  }

  async persist(schedule: Schedule): Promise<Schedule> {
    return new Promise<Schedule>(async (resolve, reject) => {
      try {
        const doc = await this.model.create(schedule.toJSON());
        resolve(
          new Schedule(
            new ScheduleDateTime(doc.dateTime),
            new ScheduleDescription(doc.scheduleDescription),
            doc.scheduleStatus,
          ),
        );
      } catch (err) {
        reject(err);
      }
    });
  }
}
