import { TypeOrmModule } from "@nestjs/typeorm";
import {
  Group,
  GroupPrivilage,
  Notif,
  NotifGroup,
  NotifServiceUser,
} from "./notif.entity";

export const notifRepoProviders = TypeOrmModule.forFeature([
  Group,
  Notif,
  NotifGroup,
  NotifServiceUser,
  GroupPrivilage,
]);
