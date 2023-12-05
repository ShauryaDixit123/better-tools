import { TypeOrmModule } from "@nestjs/typeorm";
import {
  ChatEntity,
  ChatHeirarchy,
  ChatRoom,
  ServiceUserChatRoom,
} from "./chat.entity";
import { ContentType } from "common/entities/type.entity";
import { ServiceUser } from "apps/gateway/src/entities/users.entity";

export const chatRepoProviders = TypeOrmModule.forFeature([
  ChatRoom,
  ServiceUserChatRoom,
  ChatEntity,
  ChatHeirarchy,
  ContentType,
  ServiceUser,
]);
