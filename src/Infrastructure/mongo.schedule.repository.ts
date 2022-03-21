import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ScheduleDocument, Schedules } from './schema/schedule.schema';
import { ScheduleRepository } from '../Domain/schedule.respository';
import { Schedule } from '../Domain/schedule';
import { ScheduleDateTime } from '../Domain/ValueObjects/schedule.date.time';
import { ScheduleDescription } from '../Domain/ValueObjects/schedule.description';
import { ScheduleStatus } from '../Domain/ValueObjects/schedule.status';

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
