import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  LoggerService,
  Inject,
} from '@nestjs/common';
import { LoginUseCase } from 'src/Application/LoginUseCase';
import { LoginRequest } from 'src/Application/LoginRequest';

@Injectable()
export class PassportLocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private useCase: LoginUseCase,
    @Inject('Logger')
    private logger: LoggerService,
  ) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const user = await this.useCase.execute(
        new LoginRequest(email, password),
      );
      if (!user) {
        throw new UnauthorizedException({ message: 'Invalid User' });
      }
      return user;
    } catch (e) {
      this.logger.error(e.message, e.stack);
      throw new UnauthorizedException({ message: e.message });
    }
  }
}
