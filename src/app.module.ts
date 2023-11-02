import { Module, Global } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import {
  InitializePgdbConnection,
  InitializeLocalMediaConfig,
} from "configs/local";
import { GoogleStrategy } from "./modules/gateway/services/auth/local.strategy";
import { AuthService } from "./modules/gateway/services/auth/auth.service";
import { GatewayModule } from "./modules/gateway/gateway.module";
const InitializeEnv = ConfigModule.forRoot({
  isGlobal: true,
});

@Module({
  imports: [
    InitializeEnv,
    InitializePgdbConnection,
    InitializeLocalMediaConfig,
    GatewayModule,
  ],
  providers: [],
})
export class AppModule {
  // constructor(private dataSource: DataSource) {}
}
