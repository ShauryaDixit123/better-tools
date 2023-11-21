import { TypeOrmModule } from "@nestjs/typeorm";
import {
  ChatEntity,
  ChatHeirarchy,
  ChatRoom,
  ServiceUserChatRoom,
} from "./chat.entity";

export const chatRepoProviders = TypeOrmModule.forFeature([
  ChatRoom,
  ServiceUserChatRoom,
  ChatEntity,
  ChatHeirarchy,
]);
