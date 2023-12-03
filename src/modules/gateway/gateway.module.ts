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
  mapEnvVariables,
} from "configs/local";
import { ConfigService } from "@nestjs/config";
import { GoogleStrategy } from "./services/auth/local.strategy";
import { ChatController } from "./controllers/chat.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CHAT_SERVICE_NAME } from "src/common/constants/service";
import { SocketModule } from "../socket/socket.module";
import { commonProviders } from "src/common/entities/type.provider";
import { ChatService } from "../chat/chat.service";
import { ChatModule } from "../chat/chat.module";

const registerJWTModule = JwtModule.register({
  global: true,
  secret: mapEnvVariables().jwt.secret,
  signOptions: { expiresIn: "60s" },
});

const registerPassportModule = PassportModule.register({
  defaultStrategy: "google",
});
const registerMicroServices = ClientsModule.register([
  { ...InitializeChatMicroserviceConfig, transport: Transport.TCP },
]);

@Module({
  controllers: [UserController, AuthController, ChatController],
  providers: [UserController, UserService, AuthService, GoogleStrategy],
  imports: [
    PassportModule,
    SocketModule,
    ChatModule,
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
