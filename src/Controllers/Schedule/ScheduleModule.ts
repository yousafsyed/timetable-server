import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateScheduleUseCase } from '../../Application/CreateScheduleUseCase';
import { CreateScheduleHandler } from './CreateScheduleHandler';
import { MongoScheduleRepository } from '../../Infrastructure/mongo.schedule.repository';
import { SCHEDULE_REPOSITORY_TOKEN } from '../../Domain/schedule.respository';

import {
  ScheduleSchema,
  Schedules,
} from '../../Infrastructure/schema/schedule.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Schedules.name, schema: ScheduleSchema },
    ]),
  ],
  controllers: [CreateScheduleHandler],
  providers: [
    {
      provide: SCHEDULE_REPOSITORY_TOKEN,
      useClass: MongoScheduleRepository,
    },
    CreateScheduleUseCase,
  ],
})
export class ScheduleModule {}
