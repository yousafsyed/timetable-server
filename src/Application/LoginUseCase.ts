import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { UserPublicDTO } from 'src/Domain/User';
import { Email } from 'src/Domain/ValueObjects/Email';
import { Password } from 'src/Domain/ValueObjects/Password';
import {
  UserRepository,
  USER_REPOSITORY_TOKEN,
} from '../Domain/UserRepository';
import { LoginRequest } from './LoginRequest';
@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private userRepo: UserRepository,
  ) {}

  async execute(req: LoginRequest): Promise<UserPublicDTO> {
    const user = await this.userRepo.getUserByEmail(new Email(req.getEmail()));
    if (user.getPassword().equals(new Password(req.getPassword()))) {
      return user.toJson();
    }
    throw new Error('Invalid User');
  }
}
