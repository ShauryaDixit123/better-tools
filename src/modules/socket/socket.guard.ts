import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Socket } from "socket.io";
import { ServerError } from "src/common/exceptions/error";

@Injectable()
export class SocketGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== "ws") return true;

    const client: Socket = context.switchToWs().getClient();
    const { authorization } = client.handshake.headers;
    Logger.log(authorization, "auth");
    return true;
  }
  static validate(client: Socket) {
    const { authorization } = client.handshake.headers;
    Logger.log(authorization, "auth");
    if (!authorization) throw new UnauthorizedException("Unauthorized");
    return true;
  }
}
