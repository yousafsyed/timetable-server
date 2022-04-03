import { Email } from './ValueObjects/Email';
import { User } from './User';
export const USER_REPOSITORY_TOKEN = Symbol('UserRepository');
export interface UserRepository {
  getUserByEmail(email: Email): Promise<User>;

  persist(user: User): Promise<User>;

  update(user: User): Promise<User>;
}
