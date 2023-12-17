import { NestFactory } from "@nestjs/core";
import { SocketModule } from "./socket.module";
import { Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(SocketModule, {
    transport: Transport.TCP,
    options: {
      host: "localhost",
      port: 88,
      autoConnect: true,
    },
  });
  await app.listen();
}
bootstrap();
