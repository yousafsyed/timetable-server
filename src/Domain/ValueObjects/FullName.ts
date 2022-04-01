import util from 'util';
export class FullName {
  constructor(private firstName: string, private lastName: string) {}

  public value(): string {
    return util.format('%s %s', this.firstName, this.lastName);
  }
}
