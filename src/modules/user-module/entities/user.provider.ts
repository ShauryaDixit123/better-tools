import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";

export const userRepoProviders = TypeOrmModule.forFeature([User]);
