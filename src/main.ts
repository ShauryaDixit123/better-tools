import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import { ChatModule } from "./modules/chat/chat.module";
import { configService } from "./configs/config.service";
import { CHAT_SERVICE_NAME } from "./common/constants/service";
import { InitializeChatMicroserviceConfig } from "configs/local";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const chatMicroService = await NestFactory.createMicroservice(
    ChatModule,
    InitializeChatMicroserviceConfig
  );
  app.setGlobalPrefix("api");
  await chatMicroService.listen();
  await app.listen(process.env.APP_PORT);
}

bootstrap();

/// API GATEWAY
