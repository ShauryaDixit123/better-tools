import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Post,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "../services/users.service";
import { UserController } from "./users.controller";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { ServiceUser } from "../entities/users.entity";
import { firstValueFrom } from "rxjs";
import { CHAT_SERVICE_NAME } from "common/constants/service";
import { SocketGateway } from "apps/socket/src/socket.gateway";
import { ChatService } from "apps/chat/src/chat.service";
import {
  ChatEntityI,
  CreateChatRoomI,
  JoinRoomI,
} from "apps/chat/src/chat.interface";
import { ServerError } from "common/exceptions/error";

@Controller("chat")
export class ChatController {
  constructor(
    @Inject(CHAT_SERVICE_NAME)
    private readonly chatServiceClient: ClientProxy,
    @Inject(SocketGateway)
    private readonly wsGateway: SocketGateway,
    private readonly userController: UserController,
    private readonly chatService: ChatService
  ) {}
  async onApplicationBootstrap() {
    await this.chatServiceClient.connect();
  }
  @Get("/ping")
  ping() {
    console.log("here");
    return this.chatServiceClient.send({ cmd: "ping" }, {});
  }
  @Get("/ping1")
  pinghere() {
    console.log("here");
    return "pong";
  }
  @Get("/try")
  trysocket() {
    this.wsGateway.sendMessage();
  }
  @Post("/createChatRoom")
  async createChatRoom(@Body() body: CreateChatRoomI) {
    try {
      const chatRoom = await this.chatService.createChatRoom(body);
      this.wsGateway.joinRoom({
        id: [chatRoom.id],
      });
      return chatRoom;
    } catch (e) {
      throw new ServerError(e);
    }
  }
  @Post("/joinRoom")
  async joinToRoom(@Body() body: JoinRoomI) {
    try {
      this.wsGateway.joinRoom({
        id: body.id,
      });
      const chats = await this.chatServiceClient.emit(
        { cmd: "joinRoom" },
        body
      );

      await console.log(chats, "cahashas");
      await this.wsGateway.emitToRoom({
        id: [...body.id],
        event: "hello",
        data: chats,
      });
      return {
        status: HttpStatus.OK,
        data: chats,
      };
    } catch (e) {
      throw new ServerError(e);
    }
  }
  @Post("/emitMessage/:id")
  async emitToRoom(@Param() params: { id: string }, @Body() body: ChatEntityI) {
    this.chatServiceClient.emit({ cmd: "emitMessage" }, body);
    this.wsGateway.emitToRoom({
      id: [params.id],
      event: "hello",
      data: body.message,
    });
    return HttpStatus.OK;
  }
  @Post("/emmitToRoomms/:id")
  async emitToRoomMS(
    @Param() params: { id: string },
    @Body() body: ChatEntityI
  ) {
    this.chatServiceClient.emit({ cmd: "createChatRoom" }, { ...body });
    this.wsGateway.emitToRoom({
      id: [params.id],
      event: "hello",
      data: body.message,
    });
    return HttpStatus.OK;
  }
  @Post("/contentType")
  async createContentType(@Body() body: { name: string; type: string }) {
    return this.chatService.addContentType({
      ...body,
      id: `${body.name}.${body.type}`,
    });
  }
}
