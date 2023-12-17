import { Injectable } from '@nestjs/common';

@Injectable()
export class NotifService {
  getHello(): string {
    return 'Hello World!';
  }
}
