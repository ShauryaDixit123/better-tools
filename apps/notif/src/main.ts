import { NestFactory } from '@nestjs/core';
import { NotifModule } from './notif.module';

async function bootstrap() {
  const app = await NestFactory.create(NotifModule);
  await app.listen(3000);
}
bootstrap();
