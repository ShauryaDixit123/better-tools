import { Controller, HttpStatus, Logger } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { ChatService } from "./chat.service";
import {
  ChatEntityI,
  CreateChatRoomI,
  JoinRoomI,
  JoinRoomResponseI,
} from "./chat.interface";
import { ChatRoom, ServiceUserChatRoom } from "./chat.entity";

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @MessagePattern({ cmd: "ping" })
  pong(): string {
    return "pong";
  }
  @MessagePattern({ cmd: "createChatRoom" })
  async createChatRoom(body: CreateChatRoomI) {
    return await this.chatService.createChatRoom(body);
  }
  @MessagePattern({ cmd: "addUsersToChatRoom" })
  async addUserToChatRoom(body: {
    chatRoom: string;
    serviceUser: string[];
  }): Promise<Number> {
    const room = await this.chatService.getChatRoomById(body.chatRoom);
    const res = body.serviceUser.map(async (su) => {
      const serviceUserDetails = await this.chatService.getServiceUserById(su);
      return {
        chatRoom: room,
        serviceUser: serviceUserDetails,
      };
    });
    // await this.chatService.addUsersToChatRoom(res);
    return HttpStatus.OK;
  }
  @MessagePattern({ cmd: "joinRoom" })
  async joinRoom(body: JoinRoomI) {
    console.log("here!");
    const chats: JoinRoomResponseI = {
      ...body,
      users: body.id,
    };
    try {
      const rooms = await this.chatService.getChatRoomByServiceUserIds(body.id);
      console.log(rooms, "rooms");
      if (Object.keys(rooms).length == 0) {
        Logger.log("hrere!1");
        const chatRoomResponse = await this.chatService.createChatRoom({
          roomOwner: body.roomOwner,
          name: body.name,
        });
        const serviceUserMap = await Promise.all(
          body.id.map(async (id) => {
            const serviceUser = await this.chatService.getServiceUserById(id);
            return {
              chatRoom: chatRoomResponse,
              serviceUser: serviceUser,
            };
          })
        );
        Logger.log("hrere!2", serviceUserMap);
        await this.chatService.addUsersToChatRoom(serviceUserMap);
        Logger.log("hrere!3");
        // chats.name = chatRoom.id;
        chats.initMessage = "Welcome to the new chat room";
      } else {
        chats.chatMessages = await this.chatService.getChatByRoomId(
          rooms.chatRoom as any
        );
        chats.chatRoomId = rooms.chatRoom as any;
      }
      console.log(chats, "chats");
      return { chats };
    } catch (e) {
      Logger.log(e);
    }
  }
  @MessagePattern({ cmd: "emitMessage" })
  async emitMessage(body: ChatEntityI) {
    const contentType = await this.chatService.addContentType({
      id: `${body.type}."TEXT"`,
      name: body.type,
      type: "TEXT",
    });
    const chatEntity = await this.chatService.addChatEnitity({
      ...body,
      type: contentType.id,
    });
    console.log(chatEntity, "chatEntity");
    const chatHeirarchy = await this.chatService.addChatHeirarchy({
      chatEntity: chatEntity.id,
      parent: body.parent,
    });
    return chatHeirarchy;
  }
}

// .createQueryBuilder("scr")
//     .select("scr.chatRoomId", "chatRoom")
//     .addSelect(
//       "ARRAY_AGG(scr.serviceUserId ORDER BY scr.serviceUserId)",
//       "users"
//     )
//     .groupBy("scr.chatRoomId")
//     .having(
//       "ARRAY_AGG(scr.serviceUserId ORDER BY scr.serviceUserId) @> CAST(:ids AS uuid[])",
//       {
//         ids,
//       }
//     );
