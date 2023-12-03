import { TypeOrmModule } from "@nestjs/typeorm";
import {
  ChatEntity,
  ChatHeirarchy,
  ChatRoom,
  ServiceUserChatRoom,
} from "./chat.entity";
import { ContentType } from "src/common/entities/type.entity";
import { ServiceUser } from "../gateway/entities/users.entity";

export const chatRepoProviders = TypeOrmModule.forFeature([
  ChatRoom,
  ServiceUserChatRoom,
  ChatEntity,
  ChatHeirarchy,
  ContentType,
  ServiceUser,
]);
