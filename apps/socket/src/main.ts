import { NestFactory } from "@nestjs/core";
import { SocketModule } from "./socket.module";
import { Transport } from "@nestjs/microservices";
import { configService } from "apps/configs/config.service";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(SocketModule, {
    transport: Transport.TCP,
    options: {
      host: "localhost",
      port: configService.getValue("SOCKET_SERVICE_PORT"),
      autoConnect: true,
    },
  });
  await app.listen();
}
bootstrap();
