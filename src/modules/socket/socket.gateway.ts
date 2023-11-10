import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from "@nestjs/websockets";
import { SocketService } from "./socket.service";
import { CreateSocketDto } from "./dto/create-socket.dto";
import { UpdateSocketDto } from "./dto/update-socket.dto";
import { Server, Socket } from "socket.io";
import { UseGuards } from "@nestjs/common";
import { SocketGuard } from "./socket.guard";
import { socketMiddlewareAuth } from "./socket.mw";
import { configService } from "src/configs/config.service";

@WebSocketGateway(Number(configService.getValue("SOCKET_SERVICE_PORT")), {
  namespace: "socket",
  cors: {
    origin: "*",
  },
})
@UseGuards(SocketGuard)
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor(private readonly socketService: SocketService) {}
  handleConnection(client: Socket) {
    client.emit("connection", "ok");
  }
  afterInit(client: Socket) {
    client.use(socketMiddlewareAuth());
    console.log("initialized!");
  }
  handleDisconnect(client: Socket) {
    client.disconnect(client.data.email);
    return "ok";
  }

  createRoomForService(uid: string[], callBack?: () => void) {
    this.server.socketsJoin(uid);
    return callBack ? callBack() : null;
  }

  listenForMessages() {
    this.server.on("connection", (ws) => {
      ws.on("message", (e) => {
        console.log(e);
      });
    });
    console.log("message received");
  }
  getClient() {
    return this.server;
  }
  @SubscribeMessage("joinRoom")
  joinRoom(@MessageBody() body: { id: string[]; callBack?: () => void }) {
    if (!body.id) {
      body.id = ["CHAT_ROOM_UID"];
    }
    this.createRoomForService(body.id, body.callBack);
    return "OK!!";
  }
  @SubscribeMessage("emitToRoom")
  async emitToRoom(
    @MessageBody() body: { id: string[]; event: string; data: any }
  ) {
    console.log(body.id, body.data, body.event);
    this.server.to(body.id).emit(body.event, body.data);
    return "OK";
  }

  sendMessage() {
    this.server.emit("hey", "ooooollllaalala!");
  }
}
