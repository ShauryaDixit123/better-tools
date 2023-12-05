import { Controller, Get, Param } from "@nestjs/common";
import { SocketGateway } from "apps/socket/src/socket.gateway";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

@Controller("auth")
export class AuthController {
  constructor(private readonly socketGateway: SocketGateway) {}
  @Get("/connect/ws/:key")
  async connectWebsocket(@Param("key") key: string) {
    // await this.socketGateway.handleConnection();
  }
}
