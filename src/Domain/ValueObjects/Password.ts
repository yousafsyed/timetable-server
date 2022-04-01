import crypto from 'crypto';
import util from 'util';
export class Password {
  private salt: string;
  private hashedPassword: string;
  private password: string;
  private validPasswordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,20}$/;

  constructor(password: string, _isHashed = false) {
    if (_isHashed) {
      [this.salt, this.hashedPassword] = password.split(':');
    } else {
      this.guardAgainstInvalidPassword(password);
      this.password = password;
      this.salt = crypto.randomBytes(16).toString('hex');
      this.hashedPassword = this.hash(this.password);
    }
  }

  private guardAgainstInvalidPassword(password: string) {
    if (!password.match(this.validPasswordRegex)) {
      throw Error(
        'Password should have lenght of 8-20 and atleast one Captial Letter, one Small Letter and One Special Char',
      );
    }
  }

  private hash(password: string): string {
    return crypto.scryptSync(password, this.salt, 64).toString('hex');
  }

  public getSalt(): string {
    return this.salt;
  }

  public getHashedPassword(): string {
    return this.hashedPassword;
  }

  public getPassword(): string {
    return this.password;
  }

  public value(): string {
    return util.format('%s:%s', this.salt, this.hashedPassword);
  }

  public equals(password: Password): boolean {
    return this.getHashedPassword() === this.hash(password.getPassword());
  }
}
