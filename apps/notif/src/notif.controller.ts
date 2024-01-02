import { Controller, Get } from "@nestjs/common";
import { NotifService } from "./notif.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class NotifController {
  constructor(private readonly notifService: NotifService) {}

  @MessagePattern("pong")
  pong(): string {
    console.log("here from notif!");
    return "pong";
  }
}
