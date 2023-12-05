import { TypeOrmModule } from "@nestjs/typeorm";
import { ContentType } from "./type.entity";

export const commonProviders = TypeOrmModule.forFeature([ContentType]);
