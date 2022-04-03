export class CreateUserUseCaseRequest {
  constructor(
    private email: string,
    private password: string,
    private firstname: string,
    private lastname: string,
  ) {}

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getFirstName(): string {
    return this.firstname;
  }

  getLastName(): string {
    return this.lastname;
  }
}
