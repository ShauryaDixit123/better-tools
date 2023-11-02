import { HttpException, HttpStatus } from '@nestjs/common';

export class MessageError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}
export class ServerError extends HttpException {
  constructor(message) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: message,
      },
      HttpStatus.FORBIDDEN,
      {
        cause: message,
      },
    );
  }
}
