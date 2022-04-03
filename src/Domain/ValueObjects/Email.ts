export class Email {
  private emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  constructor(private email: string) {
    this.guardAgainstInvalidEmail();
  }

  private guardAgainstInvalidEmail() {
    if (!this.emailRegex.test(this.email)) {
      throw new Error('Invalid email');
    }
  }

  public value(): string {
    return this.email;
  }
}
