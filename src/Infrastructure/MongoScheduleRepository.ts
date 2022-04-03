import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ScheduleDocument, ScheduleModel } from './Schema/ScheduleSchema';
import { ScheduleRepository } from '../Domain/ScheduleRepository';
import { Schedule } from '../Domain/Schedule';
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
    return this.makeScheduleFromDocuement(
      await this.model.create(schedule.toJSON()),
    );
  }

  async bulkPersist(schedules: Schedule[]): Promise<Schedule[]> {
    const docs = await this.model.insertMany(
      schedules.map((schedule: Schedule) => {
        const scheduleDto = schedule.toJSON();
        return {
          _id: scheduleDto.scheduleId,
          ...scheduleDto,
        };
      }),
    );

    return docs.map((doc: ScheduleDocument): Schedule => {
      return this.makeScheduleFromDocuement(doc);
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
