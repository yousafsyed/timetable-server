import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './LocalAuthGuard';
import { LoginUseCase } from 'src/Application/LoginUseCase';

@Controller({
  version: '1',
})
export class LoginHandler {
  constructor(private usecase: LoginUseCase) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.usecase.getJwtToken(req.user);
  }
}
