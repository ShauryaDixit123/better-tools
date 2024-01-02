import { Module, Global } from "@nestjs/common";
import { UserController } from "./controllers/users.controller";
import { UserService } from "./services/users.service";
import { userRepoProviders } from "./entities/user.provider";
import { AuthService } from "./services/auth/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import {
  InitializeChatMicroserviceConfig,
  InitializeNotifMicroserviceConfig,
  mapEnvVariables,
} from "configs/local";
import { ConfigService } from "@nestjs/config";
import { GoogleStrategy } from "./services/auth/local.strategy";
import { ChatController } from "./controllers/chat.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { SocketModule } from "../../socket/src/socket.module";
import { ChatService } from "../../chat/src/chat.service";
import { ChatModule } from "../../chat/src/chat.module";
import { commonProviders } from "common/entities/type.provider";
import { NotifController } from "./controllers/notif.controller";
import { NotifModule } from "apps/notif/src/notif.module";

const registerJWTModule = JwtModule.register({
  global: true,
  secret: mapEnvVariables().jwt.secret,
  signOptions: { expiresIn: "60s" },
});

const registerPassportModule = PassportModule.register({
  defaultStrategy: "google",
});
const registerMicroServices = ClientsModule.register([
  { ...InitializeChatMicroserviceConfig, transport: Transport.KAFKA },
  { ...InitializeNotifMicroserviceConfig, transport: Transport.KAFKA },
]);

@Module({
  controllers: [
    UserController,
    AuthController,
    NotifController,
    ChatController,
  ],
  providers: [UserController, UserService, AuthService, GoogleStrategy],
  imports: [
    PassportModule,
    SocketModule,
    ChatModule,
    NotifModule,
    userRepoProviders,
    commonProviders,
    registerJWTModule,
    registerMicroServices,
    registerPassportModule,
  ],
  exports: [PassportModule, AuthService, UserController, UserService],
})
@Global()
@Module({
  imports: [AuthService],
  exports: [AuthService, GatewayModule],
})
export class GatewayModule {}
