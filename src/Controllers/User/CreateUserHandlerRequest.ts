import { IsNotEmpty, IsEmail } from 'class-validator';
export class CreateUserHandlerRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  firstname: string;
  @IsNotEmpty()
  lastname: string;
}
