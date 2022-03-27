import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateScheduleFromDateRangeUseCase } from 'src/Application/CreateScheduleFromDateRangeUseCase';
import { CreateScheduleFromDateRangeHandler } from './CreateScheduleFromDateRangeHandler';
import { MongoScheduleRepository } from '../../Infrastructure/MongoScheduleRepository';
import { SCHEDULE_REPOSITORY_TOKEN } from '../../Domain/ScheduleRepository';
import {
  ScheduleCollectionBuilder,
  SCHEDULE_COLLECTION_BUILDER_TOKEN,
} from '../../Domain/ScheduleCollectionBuilder';

import {
  ScheduleSchema,
  ScheduleModel,
} from '../../Infrastructure/Schema/ScheduleSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ScheduleModel.name, schema: ScheduleSchema },
    ]),
  ],
  controllers: [CreateScheduleFromDateRangeHandler],
  providers: [
    {
      provide: SCHEDULE_REPOSITORY_TOKEN,
      useClass: MongoScheduleRepository,
    },
    {
      provide: SCHEDULE_COLLECTION_BUILDER_TOKEN,
      useClass: ScheduleCollectionBuilder,
    },
    CreateScheduleFromDateRangeUseCase,
  ],
})
export class ScheduleModule {}
