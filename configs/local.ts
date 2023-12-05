import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "apps/configs/config.service";
import { CHAT_SERVICE_NAME } from "common/constants/service";
import { MinioModule } from "nestjs-minio-client";

export const InitializePgdbConnection = TypeOrmModule.forRoot(
  configService.initializePgdbConfig()
);

console.log(process.env.PGDB_PORT, process.env.PGDB_HOST);
export const mapEnvVariables = () => ({
  tier: process.env.TIER,
  appPort: process.env.APP_PORT,
  database: {
    port: process.env.PGDB_PORT,
    host: parseInt(process.env.PGDB_HOST, 10),
    user: process.env.PGDB_USER,
    password: process.env.PGDB_PASSWORD,
    database: process.env.PGDB_DATABASE,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callBackUrl: process.env.GOOGLE_CALLBACK_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});

export const InitializeLocalMediaConfig = MinioModule.registerAsync({
  imports: [ConfigModule],
  useFactory: () => ({
    endPoint: configService.getValue("AWS_S3_ENDPOINT"),
    port: parseInt(configService.getValue("AWS_S3_PORT"), 10),
    useSSL: configService.getValue("AWS_S3_USE_SSL") === "true",
    accessKey: configService.getValue("AWS_ACCESS_KEY"),
    secretKey: configService.getValue("AWS_ACCESS_SECRET_KEY"),
  }),
});
export const InitializeEnv = ConfigModule.forRoot({
  isGlobal: true,
});

export const InitializeChatMicroserviceConfig = {
  name: CHAT_SERVICE_NAME,
  transport: Transport.TCP,
  options: {
    host: configService.getValue("CHAT_MICROSERVICE_HOST"),
    port: Number(configService.getValue("CHAT_MICROSERVICE_PORT")),
  },
};
@Module({
  exports: [InitializePgdbConnection, mapEnvVariables],
})
export class InitPgdbModule {}
