import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CHAT_SERVICE_NAME } from "src/common/constants/service";
import { ChatModule } from "src/modules/chat/chat.module";

@Controller("chat")
export class ChatController {
  constructor(
    @Inject(CHAT_SERVICE_NAME)
    private readonly chatServiceClient: ClientProxy
  ) {
    // this.onApplicationBootstrap();
  }
  async onApplicationBootstrap() {
    await this.chatServiceClient.connect();
  }
  @Get("/ping")
  ping() {
    return this.chatServiceClient.send({ cmd: "ping" }, {});
  }
}
