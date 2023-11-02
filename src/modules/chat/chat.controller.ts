import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";

@Controller()
export class ChatController {
  @MessagePattern({ cmd: "ping" })
  pong(): string {
    return "pong";
  }
}
