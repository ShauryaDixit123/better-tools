import { Module } from "@nestjs/common";
import { NotifController } from "./notif.controller";
import { NotifService } from "./notif.service";
import { ClientKafka } from "@nestjs/microservices";

@Module({
  imports: [ClientKafka],
  controllers: [NotifController],
  providers: [NotifService, ClientKafka],
})
export class NotifModule {}
