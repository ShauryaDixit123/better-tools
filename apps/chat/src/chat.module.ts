import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import {
  ClientKafka,
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { chatRepoProviders } from "./chat.provider";
import {
  InitializeChatMicroserviceConfig,
  InitializeEnv,
  InitializePgdbConnection,
} from "configs/local";
import { CHAT_SERVICE_NAME } from "common/constants/service";

// export const registerChatProvider = {
//   provide: CHAT_SERVICE_NAME,
//   inject: [ConfigService],
//   useFactory: (configService: ConfigService) => {
//     return ClientProxyFactory.create({
//       transport: Transport.TCP,
//       options: {
//         host: configService.get("CHAT_MICROSERVICE_HOST"),
//         port: configService.get("CHAT_MICROSERVICE_PORT"),
//       },
//     });
//   },
// };

@Module({
  providers: [ChatService, ClientKafka],
  imports: [
    InitializeEnv,
    InitializePgdbConnection,
    ClientKafka,
    chatRepoProviders,
  ],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
