import { Controller, Get } from '@nestjs/common';
import { NotifService } from './notif.service';

@Controller()
export class NotifController {
  constructor(private readonly notifService: NotifService) {}

  @Get()
  getHello(): string {
    return this.notifService.getHello();
  }
}
