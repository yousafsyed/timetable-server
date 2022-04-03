import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UserDocument, UserModel } from './Schema/UserSchema';
import { UserRepository } from '../Domain/UserRepository';
import { User } from '../Domain/User';
import { UserId } from '../Domain/ValueObjects/UserId';
import { Email } from 'src/Domain/ValueObjects/Email';
import { Password } from 'src/Domain/ValueObjects/Password';
import { FullName } from 'src/Domain/ValueObjects/FullName';
import { EmailVerificationCode } from 'src/Domain/ValueObjects/EmailVerificationCode';

@Injectable()
export class MongoUserRepository implements UserRepository {
  constructor(
    @InjectModel(UserModel.name) private model: Model<UserDocument>,
  ) {}

  async getUserByEmail(email: Email): Promise<User> {
    return this.makeUserFromDocument(
      await this.model.findOne({ email: email.value() }),
    );
  }
  async persist(user: User): Promise<User> {
    return this.makeUserFromDocument(
      await this.model.create(this.makeUserDocumentFromUser(user)),
    );
  }

  async update(user: User): Promise<User> {
    const doc = await this.model.findOne({ _id: user.getUserId().value() });
    doc.updateOne(this.makeUserDocumentFromUser(user));
    return this.makeUserFromDocument(doc);
  }

  private makeUserFromDocument(doc: UserDocument): User {
    return new User(
      new UserId(doc._id),
      new Email(doc.email),
      new Password(doc.password, true),
      new FullName(doc.firstName, doc.lastName),
      doc.emailStatus,
      doc.accountStatus,
      new EmailVerificationCode(doc.emailVerificationCode),
      doc.createdAt,
      doc.updatedAt,
    );
  }

  private makeUserDocumentFromUser(user: User) {
    return {
      _id: user.getUserId().value(),
      email: user.getEmail().value(),
      password: user.getPassword().value(),
      firstName: user.getFullname().getFirstName(),
      lastName: user.getFullname().getLastName(),
      emailStatus: user.getEmailStatus(),
      accountStatus: user.getAccountStatus(),
      emailVerificationCode: user.getEmailVerificationCode().value(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    };
  }
}
