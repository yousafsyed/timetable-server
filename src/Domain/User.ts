import { randomUUID } from 'crypto';
import { AccountStatus } from './ValueObjects/AccountStatus';
import { Email } from './ValueObjects/Email';
import { EmailStatus } from './ValueObjects/EmailStatus';
import { EmailVerificationCode } from './ValueObjects/EmailVerificationCode';
import { FullName } from './ValueObjects/FullName';
import { Password } from './ValueObjects/Password';
import { UserId } from './ValueObjects/UserId';

export type UserPublicDTO = {
  userId: string;
  email: string;
  fullname: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserFullDTO = {
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  emailStatus: number;
  accountStatus: number;
  emailVerificationCode: string;
  createdAt: Date;
  updatedAt: Date;
};
export class User {
  constructor(
    private userId: UserId,
    private email: Email,
    private password: Password,
    private fullname: FullName,
    private emailStatus: EmailStatus,
    private accountStatus: AccountStatus,
    private emailVerificationCode: EmailVerificationCode,
    private createdAt: Date,
    private updatedAt: Date,
  ) {}

  toJson(): UserPublicDTO {
    return {
      email: this.email.value(),
      userId: this.userId.value(),
      fullname: this.fullname.getFullName(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  getUserId(): UserId {
    return this.userId;
  }
  getEmail(): Email {
    return this.email;
  }
  getPassword(): Password {
    return this.password;
  }

  getFullname(): FullName {
    return this.fullname;
  }

  getEmailStatus(): EmailStatus {
    return this.emailStatus;
  }

  getAccountStatus(): AccountStatus {
    return this.accountStatus;
  }

  getEmailVerificationCode(): EmailVerificationCode {
    return this.emailVerificationCode;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  static makeFromRawData(userRawData: UserFullDTO, generateId = false): User {
    return new User(
      new UserId(generateId ? randomUUID() : userRawData.userId),
      new Email(userRawData.email),
      new Password(userRawData.password),
      new FullName(userRawData.firstname, userRawData.lastname),
      userRawData.emailStatus,
      userRawData.accountStatus,
      new EmailVerificationCode(userRawData.emailVerificationCode),
      userRawData.createdAt,
      userRawData.updatedAt,
    );
  }
}
