import { Module } from '@nestjs/common';
import { NotifController } from './notif.controller';
import { NotifService } from './notif.service';

@Module({
  imports: [],
  controllers: [NotifController],
  providers: [NotifService],
})
export class NotifModule {}
