import { NestFactory } from "@nestjs/core";
import { ChatModule } from "./chat.module";
import { Transport } from "@nestjs/microservices";
import { configService } from "apps/configs/config.service";
import { InitializeChatMicroserviceConfig } from "configs/local";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    ChatModule,
    InitializeChatMicroserviceConfig
  );
  await app.listen();
}
bootstrap();
