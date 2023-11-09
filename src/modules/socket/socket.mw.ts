import { Socket } from "socket.io";
import { ServerError } from "src/common/exceptions/error";
import { SocketGuard } from "./socket.guard";
import { UnauthorizedException } from "@nestjs/common";

export type SocketIOMiddleware = {
  client: Socket;
  next: (err: Error) => void;
};

export const socketMiddlewareAuth = () => {
  return (client, next) => {
    try {
      SocketGuard.validate(client);
      next();
    } catch (e) {
      next(e);
    }
  };
};
