import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateScheduleUseCase } from '../../Application/CreateScheduleUseCase';
import { CreateScheduleFromDateRangeUseCase } from 'src/Application/CreateScheduleFromDateRangeUseCase';
import { CreateScheduleHandler } from './CreateScheduleHandler';
import { CreateScheduleFromDateRangeHandler } from './CreateScheduleFromDateRangeHandler';
import { MongoScheduleRepository } from '../../Infrastructure/MongoScheduleRepository';
import { SCHEDULE_REPOSITORY_TOKEN } from '../../Domain/ScheduleRepository';
import {
  ScheduleCollectionBuilder,
  SCHEDULE_COLLECTION_BUILDER_TOKEN,
} from '../../Domain/ScheduleCollectionBuilder';

import {
  ScheduleSchema,
  Schedules,
} from '../../Infrastructure/Schema/ScheduleSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Schedules.name, schema: ScheduleSchema },
    ]),
  ],
  controllers: [CreateScheduleHandler, CreateScheduleFromDateRangeHandler],
  providers: [
    {
      provide: SCHEDULE_REPOSITORY_TOKEN,
      useClass: MongoScheduleRepository,
    },
    {
      provide: SCHEDULE_COLLECTION_BUILDER_TOKEN,
      useClass: ScheduleCollectionBuilder,
    },
    CreateScheduleUseCase,
    CreateScheduleFromDateRangeUseCase,
  ],
})
export class ScheduleModule {}
