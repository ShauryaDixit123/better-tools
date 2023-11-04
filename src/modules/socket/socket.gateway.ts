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

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  // server: Socket;
  constructor(private readonly socketService: SocketService) {}
  handleConnection(client: Socket) {
    // this.server = client;
    client.emit("connection", "ok");
  }
  afterInit() {
    console.log("initialized!");
  }
  handleDisconnect(client: Socket) {
    client.disconnect(client.data.email);
    return "ok";
  }

  listenForMessages() {
    this.server.on("connection", (ws) => {
      ws.on("message", (e) => {
        console.log(e);
      });
    });
    console.log("message received");
  }
  @SubscribeMessage("createSocket")
  create(client: Socket, @MessageBody() data: any) {
    console.log(client.data, "here!");
    return this.socketService.create(data);
  }

  @SubscribeMessage("findAllSocket")
  findAll() {
    return this.socketService.findAll();
  }

  @SubscribeMessage("findOneSocket")
  findOne(@MessageBody() id: number) {
    return this.socketService.findOne(id);
  }

  @SubscribeMessage("updateSocket")
  update(@MessageBody() updateSocketDto: UpdateSocketDto) {
    return this.socketService.update(updateSocketDto.id, updateSocketDto);
  }

  @SubscribeMessage("removeSocket")
  remove(@MessageBody() id: number) {
    return this.socketService.remove(id);
  }
}
