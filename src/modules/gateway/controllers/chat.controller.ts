import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CHAT_SERVICE_NAME } from "src/common/constants/service";
import { SocketGateway } from "src/modules/socket/socket.gateway";

@Controller("chat")
export class ChatController {
  constructor(
    @Inject(CHAT_SERVICE_NAME)
    private readonly chatServiceClient: ClientProxy,
    @Inject(SocketGateway)
    private readonly wsGateway: SocketGateway
  ) {}
  async onApplicationBootstrap() {
    await this.chatServiceClient.connect();
  }
  @Get("/ping")
  ping() {
    return this.chatServiceClient.send({ cmd: "ping" }, {});
  }
  @Get("/try")
  trysocket() {
    this.wsGateway.sendMessage();
  }
}
