import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './AppController';
import { AppService } from '../Application/AppService';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Welcome to schedule manager"', () => {
      expect(appController.getHello()).toBe('Welcome to schedule manager');
    });
  });
});
