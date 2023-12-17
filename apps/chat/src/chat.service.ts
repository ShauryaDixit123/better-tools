import { Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  ChatEntity,
  ChatHeirarchy,
  ChatRoom,
  ServiceUserChatRoom,
} from "./chat.entity";
import { Repository } from "typeorm";
import {
  AddUserToChatRoomI,
  ChatEntityI,
  CreateChatRoomI,
} from "./chat.interface";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { ContentType } from "common/entities/type.entity";
import { ServiceUser } from "apps/gateway/src/entities/users.entity";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(ServiceUserChatRoom)
    private readonly serviceUserChatRoomRepository: Repository<ServiceUserChatRoom>,
    @InjectRepository(ChatEntity)
    private readonly chatEntityRepository: Repository<ChatEntity>,
    @InjectRepository(ChatHeirarchy)
    private readonly chatHeirarchyRepository: Repository<ChatHeirarchy>,
    @InjectRepository(ContentType)
    private readonly contentTypeRepository: Repository<ContentType>,
    @InjectRepository(ServiceUser)
    private readonly serviceUserRepository: Repository<ServiceUser>
  ) {}

  async createChatRoom(body: CreateChatRoomI): Promise<ChatRoom> {
    return await this.chatRoomRepository.save({
      name: body.name,
      roomOwner: body.roomOwner,
    });
  }
  async addUsersToChatRoom(
    body: {
      serviceUser: ServiceUser;
      chatRoom: ChatRoom;
    }[]
  ): Promise<ServiceUserChatRoom[]> {
    return this.serviceUserChatRoomRepository.save(body);
  }
  async addChatEnitity(body: ChatEntityI): Promise<ChatEntity> {
    return await this.chatEntityRepository.save(body);
  }
  async addChatHeirarchy(body: {
    chatEntity: string;
    parent: string;
  }): Promise<ChatHeirarchy> {
    return await this.chatHeirarchyRepository.save(body);
  }
  async getChatByRoomId(roomId: string): Promise<ChatHeirarchy[]> {
    const query = this.chatHeirarchyRepository
      .createQueryBuilder("ch")
      .leftJoinAndSelect("ch.chatEntity", "ce")
      .leftJoinAndSelect("ch.parent", "p")
      .where("ce.chatRoom = :roomId", { roomId });
    console.log(query.getSql());
    return await query.getMany();
  }
  async getChatRoomByServiceUserIds(
    ids: string[]
  ): Promise<ServiceUserChatRoom> {
    let res: ServiceUserChatRoom;
    const query = this.serviceUserChatRoomRepository
      .createQueryBuilder("scr")
      .select("scr.chatRoomId", "chatRoom")
      .groupBy("scr.chatRoomId")
      .where(`scr.serviceUserId IN (:...ids)`, { ids })
      .having(`COUNT(DISTINCT scr.serviceUserId) = ${ids.length}`);
    // .having(`COUNT(*) = ${ids.length}`);
    console.log(query.getSql());
    try {
      res = await query.getRawOne(); // RN RETURNING ARRAY OF ID WHERE
    } catch (e) {
      Logger.log(e);
    }
    return res;
  }
  async getServiceUserById(id: string): Promise<ServiceUser> {
    return this.serviceUserRepository.findOne({
      where: {
        id,
      },
    });
  }
  async getChatRoomById(id: string): Promise<ChatRoom> {
    return this.chatRoomRepository.findOne({
      where: {
        id,
      },
    });
  }
  async addContentType(body: {
    id: string;
    name: string;
    type: string;
  }): Promise<ContentType> {
    return await this.contentTypeRepository.save(body);
  }
}
