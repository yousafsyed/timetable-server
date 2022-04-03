export class LoginRequest {
  constructor(private email: string, private password: string) {}

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }
}
