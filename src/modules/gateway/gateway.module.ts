import { Module, Global } from "@nestjs/common";
import { UserController } from "./controllers/users.controller";
import { UserService } from "./services/users.service";
import { userRepoProviders } from "./entities/user.provider";
import { AuthService } from "./services/auth/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { mapEnvVariables } from "configs/local";
import { ConfigService } from "@nestjs/config";
import { GoogleStrategy } from "./services/auth/local.strategy";
import { ChatController } from "./controllers/chat.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { registerChatProivder } from "../chat/chat.module";
import { CHAT_SERVICE_NAME } from "src/common/constants/service";
import { SocketModule } from "../socket/socket.module";

const registerJWTModule = JwtModule.register({
  global: true,
  secret: mapEnvVariables().jwt.secret,
  signOptions: { expiresIn: "60s" },
});

const registerPassportModule = PassportModule.register({
  defaultStrategy: "google",
});
const registerMicroServices = ClientsModule.register([
  { name: CHAT_SERVICE_NAME, transport: Transport.TCP },
]);

@Module({
  controllers: [UserController, AuthController, ChatController],
  providers: [
    UserController,
    UserService,
    AuthService,
    GoogleStrategy,
    registerChatProivder,
  ],
  imports: [
    PassportModule,
    SocketModule,
    userRepoProviders,
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
