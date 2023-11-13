import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MinioModule } from "nestjs-minio-client";
import { configService as configModuleService } from "src/configs/config.service";

export const InitializePgdbConnection = TypeOrmModule.forRoot(
  configModuleService.initializePgdbConfig()
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
    endPoint: configModuleService.getValue("AWS_S3_ENDPOINT"),
    port: parseInt(configModuleService.getValue("AWS_S3_PORT"), 10),
    useSSL: configModuleService.getValue("AWS_S3_USE_SSL") === "true",
    accessKey: configModuleService.getValue("AWS_ACCESS_KEY"),
    secretKey: configModuleService.getValue("AWS_ACCESS_SECRET_KEY"),
  }),
});

@Module({
  exports: [InitializePgdbConnection, mapEnvVariables],
})
export class InitPgdbModule {}
