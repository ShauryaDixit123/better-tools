import { TypeOrmModule } from "@nestjs/typeorm";
import { ServiceUser, User } from "./users.entity";

export const userRepoProviders = TypeOrmModule.forFeature([User, ServiceUser]);
