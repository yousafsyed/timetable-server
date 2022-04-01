import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ScheduleDocument, ScheduleModel } from './Schema/ScheduleSchema';
import { ScheduleRepository } from '../Domain/ScheduleRepository';
import { Schedule, ScheduleDTO } from '../Domain/Schedule';
import { ScheduleDateTime } from '../Domain/ValueObjects/ScheduleDateTime';
import { ScheduleDescription } from '../Domain/ValueObjects/ScheduleDescription';
import { ScheduleStatus } from '../Domain/ValueObjects/ScheduleStatus';
import { ScheduleId } from '../Domain/ValueObjects/ScheduleId';
import { UserId } from '../Domain/ValueObjects/UserId';

@Injectable()
export class MongoScheduleRepository implements ScheduleRepository {
  constructor(
    @InjectModel(ScheduleModel.name) private model: Model<ScheduleDocument>,
  ) {}

  getScheduleByMonth(dateTime: Date): Array<Schedule> {
    return [
      new Schedule(
        new ScheduleId(''),
        new ScheduleDateTime(dateTime),
        new ScheduleDescription('sas'),
        ScheduleStatus.ABSENT,
        new UserId(''),
      ),
    ];
  }

  async persist(schedule: Schedule): Promise<Schedule> {
    return new Promise<Schedule>(async (resolve, reject) => {
      try {
        const doc = await this.model.create(schedule.toJSON());
        resolve(this.makeScheduleFromDocuement(doc));
      } catch (err) {
        reject(err);
      }
    });
  }

  bulkPersist(schedules: Schedule[]): Promise<Schedule[]> {
    return new Promise<Schedule[]>(async (resolve, reject) => {
      try {
        const docs = await this.model.insertMany(
          schedules.map((schedule: Schedule): ScheduleDTO => {
            return schedule.toJSON();
          }),
        );
        resolve(
          docs.map((doc: ScheduleDocument): Schedule => {
            return this.makeScheduleFromDocuement(doc);
          }),
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  makeScheduleFromDocuement(doc: ScheduleDocument): Schedule {
    return new Schedule(
      new ScheduleId(doc._id),
      new ScheduleDateTime(doc.dateTime),
      new ScheduleDescription(doc.scheduleDescription),
      doc.scheduleStatus,
      new UserId(doc.userId),
    );
  }
}
