import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import { ChatModule } from "./modules/chat/chat.module";
import { configService } from "./configs/config.service";
import { CHAT_SERVICE_NAME } from "./common/constants/service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const chatMicroService = await NestFactory.createMicroservice(ChatModule, {
    name: CHAT_SERVICE_NAME,
    transport: Transport.TCP,
    options: {
      host: configService.getValue("CHAT_MICROSERVICE_HOST"),
      port: configService.getValue("CHAT_MICROSERVICE_PORT"),
    },
  });
  app.setGlobalPrefix("api");
  chatMicroService.listen();
  await app.listen(process.env.APP_PORT);
}

bootstrap();

/// API GATEWAY
