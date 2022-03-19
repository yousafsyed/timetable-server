import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateScheduleUseCase } from 'src/Application/CreateScheduleUseCase';
import { CreateScheduleHandler } from './CreateScheduleHandler';
import { MongoScheduleRepository } from 'src/Infrastructure/mongo.schedule.repository';
import { SCHEDULE_REPOSITORY_TOKEN } from 'src/Domain/schedule.respository';

import {
  ScheduleSchema,
  Schedules,
} from 'src/Infrastructure/schema/schedule.schema';

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
