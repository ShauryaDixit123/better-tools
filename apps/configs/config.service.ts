import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getValue(key: string, throwOnMissing = true): string {
    const value = process.env?.[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value || "";
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue("PGDB_PORT", true);
  }

  public isProduction() {
    const mode = this.getValue("MODE", false);
    return mode != "DEV";
  }
  public googleAuthKey() {
    return this.getValue("GOOGLE_CLIENT_ID", true);
  }

  public initializePgdbConfig(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: this.getValue("PGDB_HOST"),
      port: Number(this.getPort()),
      username: this.getValue("PGDB_USER"),
      password: this.getValue("PGDB_PASSWORD"),
      database: this.getValue("PGDB_DATABASE"),
      entities: [
        join(__dirname, "dist/apps/**/src/*.entity{.ts,.js}"),
        join(__dirname, "dist/apps/**/src/entities/*.entity{.ts,.js}"),
      ],
      synchronize: true,
      migrationsTableName: "migration",
      autoLoadEntities: true,
      migrations: ["migration/*.ts"],
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  "PGDB_HOST",
  "PGDB_PORT",
  "PGDB_USER",
  "PGDB_PASSWORD",
  "PGDB_DATABASE",
]);

export { configService };
