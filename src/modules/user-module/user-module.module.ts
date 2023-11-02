import { Module, Global } from "@nestjs/common";
import { UserController } from "./controllers/users.controller";
import { UserModuleService } from "./services/users.service";
import { userRepoProviders } from "./entities/user.provider";
import { AuthService } from "./services/auth/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { mapEnvVariables } from "configs/local";
import { ConfigService } from "@nestjs/config";
import { GoogleStrategy } from "./services/auth/local.strategy";

const registerJWTModule = JwtModule.register({
  global: true,
  secret: mapEnvVariables().jwt.secret,
  signOptions: { expiresIn: "60s" },
});

const registerPassportModule = PassportModule.register({
  defaultStrategy: "google",
});
@Module({
  controllers: [UserController, AuthController],
  providers: [UserModuleService, AuthService, GoogleStrategy],
  imports: [
    PassportModule,
    userRepoProviders,
    registerJWTModule,
    registerPassportModule,
  ],
  exports: [PassportModule, AuthService, UserModuleService],
})
@Global()
@Module({
  imports: [AuthService],
  exports: [AuthService, UserModule],
})
export class UserModule {}
