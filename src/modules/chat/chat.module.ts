import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { CHAT_SERVICE_NAME } from "src/common/constants/service";

export const registerChatProivder = {
  provide: CHAT_SERVICE_NAME,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: configService.get("CHAT_MICROSERVICE_HOST"),
        port: configService.get("CHAT_MICROSERVICE_PORT"),
      },
    });
  },
};

@Module({
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
