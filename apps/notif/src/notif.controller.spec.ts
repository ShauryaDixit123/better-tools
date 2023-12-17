import { Test, TestingModule } from '@nestjs/testing';
import { NotifController } from './notif.controller';
import { NotifService } from './notif.service';

describe('NotifController', () => {
  let notifController: NotifController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotifController],
      providers: [NotifService],
    }).compile();

    notifController = app.get<NotifController>(NotifController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(notifController.getHello()).toBe('Hello World!');
    });
  });
});
