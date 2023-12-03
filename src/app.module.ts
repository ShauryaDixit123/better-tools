import { Module, Global } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import {
  InitializePgdbConnection,
  InitializeLocalMediaConfig,
  InitializeEnv,
} from "configs/local";
import { GoogleStrategy } from "./modules/gateway/services/auth/local.strategy";
import { AuthService } from "./modules/gateway/services/auth/auth.service";
import { GatewayModule } from "./modules/gateway/gateway.module";
import { SocketModule } from "./modules/socket/socket.module";

@Module({
  imports: [
    InitializeEnv,
    InitializePgdbConnection,
    InitializeLocalMediaConfig,
    GatewayModule,
    SocketModule,
  ],
  providers: [],
})
export class AppModule {
  // constructor(private dataSource: DataSource) {}
}
