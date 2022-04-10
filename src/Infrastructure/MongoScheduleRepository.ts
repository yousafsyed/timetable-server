import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ScheduleDocument, ScheduleModel } from './Schema/ScheduleSchema';
import { ScheduleRepository } from '../Domain/ScheduleRepository';
import { Schedule } from '../Domain/Schedule';
import { ScheduleDateTime } from '../Domain/ValueObjects/ScheduleDateTime';
import { ScheduleDescription } from '../Domain/ValueObjects/ScheduleDescription';
import { ScheduleId } from '../Domain/ValueObjects/ScheduleId';
import { UserId } from '../Domain/ValueObjects/UserId';

@Injectable()
export class MongoScheduleRepository implements ScheduleRepository {
  constructor(
    @InjectModel(ScheduleModel.name) private model: Model<ScheduleDocument>,
  ) {}

  async getScheduleByMonth(
    dateTime: Date,
    userId: UserId,
  ): Promise<Schedule[]> {
    const docs = await this.model.aggregate([
      {
        $project: {
          month: { $month: '$dateTime' },
          hour: { $hour: '$dateTime' },
          scheduleDescription: 1,
          dateTime: 1,
          userId: 1,
          scheduleStatus: 1,
        },
      },
      { $match: { month: dateTime.getMonth() + 1, userId: userId.value() } },
    ]);
    return docs.map((doc: ScheduleDocument): Schedule => {
      return this.makeScheduleFromDocuement(doc);
    });
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
