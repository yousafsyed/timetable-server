import { AccountStatus } from './ValueObjects/AccountStatus';
import { Email } from './ValueObjects/Email';
import { EmailStatus } from './ValueObjects/EmailStatus';
import { EmailVerificationCode } from './ValueObjects/EmailVerificationCode';
import { FullName } from './ValueObjects/FullName';
import { Password } from './ValueObjects/Password';
import { UserId } from './ValueObjects/UserId';

export type UserDTO = {
  userId: string;
  email: string;
  fullname: string;
  createdAt: Date;
  updatedAt: Date;
};
export class Users {
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

  toJson(): UserDTO {
    return {
      email: this.email.value(),
      userId: this.userId.value(),
      fullname: this.fullname.value(),
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
}
