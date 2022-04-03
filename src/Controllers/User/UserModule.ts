import { Module, ConsoleLogger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserUseCase } from 'src/Application/CreateUserUseCase';
import { CreateUserHandler } from './CreateUserHandler';
import { MongoUserRepository } from '../../Infrastructure/MongoUserRepository';
import { USER_REPOSITORY_TOKEN } from '../../Domain/UserRepository';
import { PassportLocalStrategy } from './PassportLocalStrategy';
import { LoginUseCase } from 'src/Application/LoginUseCase';
import { LoginHandler } from './LoginHandler';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET, JWT_EXPIRES_IN } from './JwtConstants';
import { JwtStrategy } from './PassportJWTStrategy';

import { UserSchema, UserModel } from '../../Infrastructure/Schema/UserSchema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
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
    JwtStrategy,
  ],
})
export class UserModule {}
