import { Controller, UseFilters, Body, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/Application/CreateUserUseCase';
import { CreateUserUseCaseRequest } from 'src/Application/CreateUserUseCaseRequest';
import { UserPublicDTO } from 'src/Domain/User';
import { MongoErrorFilters } from 'src/Infrastructure/ExceptionFilters/MongoErrorFilters';
import { CreateUserHandlerRequest } from './CreateUserHandlerRequest';

@Controller({
  version: '1',
})
export class CreateUserHandler {
  constructor(private usecase: CreateUserUseCase) {}

  @Post('user')
  @UseFilters(MongoErrorFilters)
  signUp(
    @Body() createUserHandlerRequest: CreateUserHandlerRequest,
  ): Promise<UserPublicDTO> {
    return this.usecase.execute(
      new CreateUserUseCaseRequest(
        createUserHandlerRequest.email,
        createUserHandlerRequest.password,
        createUserHandlerRequest.firstname,
        createUserHandlerRequest.lastname,
      ),
    );
  }
}
