import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleService } from 'src/Application/schedule.service';
import { ScheduleController } from './schedule.controller';
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
  controllers: [ScheduleController],
  providers: [
    {
      provide: SCHEDULE_REPOSITORY_TOKEN,
      useClass: MongoScheduleRepository,
    },
    ScheduleService,
  ],
})
export class ScheduleModule {}
