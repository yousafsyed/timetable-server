import { randomUUID } from 'crypto';
import { Injectable, Inject } from '@nestjs/common';
import { User, UserPublicDTO } from 'src/Domain/User';
import { AccountStatus } from 'src/Domain/ValueObjects/AccountStatus';
import { EmailStatus } from 'src/Domain/ValueObjects/EmailStatus';
import {
  UserRepository,
  USER_REPOSITORY_TOKEN,
} from '../Domain/UserRepository';
import { CreateUserUseCaseRequest } from './CreateUserUseCaseRequest';
@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private userRepo: UserRepository,
  ) {}

  async execute(req: CreateUserUseCaseRequest): Promise<UserPublicDTO> {
    return new Promise<UserPublicDTO>(async (resolve, reject) => {
      try {
        const user = await this.userRepo.persist(
          User.makeFromRawData(
            {
              userId: '',
              email: req.getEmail(),
              password: req.getPassword(),
              firstname: req.getFirstName(),
              lastname: req.getLastName(),
              emailStatus: EmailStatus.UNVERIFIED,
              accountStatus: AccountStatus.ACTIVE,
              emailVerificationCode: randomUUID(),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            true,
          ),
        );
        resolve(user.toJson());
      } catch (e) {
        reject(e);
      }
    });
  }
}
