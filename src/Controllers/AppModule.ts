import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from './Schedule/ScheduleModule';
import { UserModule } from './User/UserModule';
import { AppController } from './AppController';
import { AppService } from '../Application/AppService';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://nest:nest@mongodb/nest'),
    ScheduleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
