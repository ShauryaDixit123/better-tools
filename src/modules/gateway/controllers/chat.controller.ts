import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { CHAT_SERVICE_NAME } from "src/common/constants/service";
import { SocketGateway } from "src/modules/socket/socket.gateway";
import { UserService } from "../services/users.service";
import { UserController } from "./users.controller";
import { ServerError } from "src/common/exceptions/error";

@Controller("chat")
export class ChatController {
  constructor(
    @Inject(CHAT_SERVICE_NAME)
    private readonly chatServiceClient: ClientProxy,
    @Inject(SocketGateway)
    private readonly wsGateway: SocketGateway,
    private readonly userController: UserController
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
  @Post("/joinToRoom/:id")
  async joinToRoom(@Param() params: { id: string }) {
    let user: {
      apiKey: string;
      id: string;
    };
    this.wsGateway.joinRoom({
      id: [params.id],
      callBack: async () => {
        try {
          user = await this.userController.addUser({
            email: "abcx@c.c",
            password: "1234",
            firstName: "abc",
            lastName: "abc",
          });
          await this.wsGateway.emitToRoom({
            id: [params.id],
            event: "hello",
            data: `new user joined! ${user.id}`,
          });
        } catch (e) {
          throw new ServerError(e);
        }
      },
    });
    // await console.log(user, "user2");2

    return HttpStatus.OK;
  }
}
