import { Module, ConsoleLogger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserUseCase } from 'src/Application/CreateUserUseCase';
import { CreateUserHandler } from './CreateUserHandler';
import { MongoUserRepository } from '../../Infrastructure/MongoUserRepository';
import { USER_REPOSITORY_TOKEN } from '../../Domain/UserRepository';
import { PassportLocalStrategy } from './PassportLocalStrategy';
import { LoginUseCase } from 'src/Application/LoginUseCase';
import { LoginHandler } from './LoginHandler';

import { UserSchema, UserModel } from '../../Infrastructure/Schema/UserSchema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  controllers: [CreateUserHandler, LoginHandler],
  providers: [
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: MongoUserRepository,
    },
    {
      provide: 'Logger',
      useClass: ConsoleLogger,
    },
    PassportLocalStrategy,
    CreateUserUseCase,
    LoginUseCase,
  ],
})
export class UserModule {}
