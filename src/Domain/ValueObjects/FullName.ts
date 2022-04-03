import { format } from 'util';
export class FullName {
  constructor(private firstName: string, private lastName: string) {}

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getFullName(): string {
    return format('%s %s', this.firstName, this.lastName);
  }
}
