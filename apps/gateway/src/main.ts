import { NestFactory } from "@nestjs/core";
import { GatewayModule } from "./gateway.module";
import { Transport } from "@nestjs/microservices";
import { configService } from "apps/configs/config.service";
import { InitializeChatMicroserviceConfig } from "configs/local";

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.setGlobalPrefix("api");
  app.connectMicroservice(InitializeChatMicroserviceConfig);
  await app.startAllMicroservices();
  await app.listen(process.env.APP_PORT);
}
bootstrap();
