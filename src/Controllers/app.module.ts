import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from './schedule.module';
//import { AppController } from './app.controller';
import { AppService } from '../Application/app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://nest:nest@mongodb/nest'),
    ScheduleModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
