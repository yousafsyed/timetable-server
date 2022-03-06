import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ScheduleDocument, Schedules } from './schema/schedule.schema';
import { ScheduleRepository } from 'src/Domain/schedule.respository';
import { Schedule } from 'src/Domain/schedule';
import { ScheduleDateTime } from 'src/Domain/ValueObjects/schedule.date.time';
import { ScheduleDescription } from 'src/Domain/ValueObjects/schedule.description';
import { ScheduleStatus } from 'src/Domain/ValueObjects/schedule.status';

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
        await this.model.updateOne(
          {
            dateTime: schedule.getDateTime().value(),
          },
          schedule.toJSON(),
          { upsert: true },
        );
        resolve(schedule);
      } catch (err) {
        reject(err);
      }
    });
  }
}
