import { Controller, Get, OnModuleInit } from "@nestjs/common";
import { Client, ClientKafka, Transport } from "@nestjs/microservices";
import { InitializeNotifMicroserviceConfig } from "configs/local";

@Controller("notif")
export class NotifController implements OnModuleInit {
  constructor() {}
  @Client({ ...InitializeNotifMicroserviceConfig, transport: Transport.KAFKA })
  notifServiceClient: ClientKafka;
  onModuleInit() {
    this.notifServiceClient.subscribeToResponseOf("pong");
    this.notifServiceClient.connect();
  }
  @Get("/ping")
  ping() {
    console.log("here!");
    return this.notifServiceClient.send("pong", {});
  }
}
