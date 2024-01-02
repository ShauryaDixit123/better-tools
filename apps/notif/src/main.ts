import { NestFactory } from "@nestjs/core";
import { NotifModule } from "./notif.module";
import { InitializeNotifMicroserviceConfig } from "configs/local";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    NotifModule,
    InitializeNotifMicroserviceConfig
  );
  await app.listen();
}
bootstrap();
