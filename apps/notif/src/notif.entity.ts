import { ServiceUser } from "apps/gateway/src/entities/users.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Group {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
  @Column({
    default: null,
  })
  description: string;
  @Column({
    default: 1,
  })
  isActive: number;
  @ManyToOne(() => ServiceUser, (su) => su.id)
  createdBy: string;
  @CreateDateColumn()
  createdAt: Date;
  @CreateDateColumn()
  modifiedAt: Date;
}

@Entity()
export class Notif {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  title: string;
  @Column()
  body: string;
  @Column()
  actionUrl: string;
  @Column({
    default: 1,
  })
  status: string;
  @Column()
  priority: string;
  @Column()
  isActive: number;
  @ManyToOne(() => ServiceUser, (su) => su.id)
  createdBy: string;
  @CreateDateColumn()
  createdAt: Date;
  @CreateDateColumn()
  modifiedAt: Date;
}

@Entity()
export class NotifServiceUser {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => ServiceUser, (su) => su.id)
  recipient: ServiceUser;
  @ManyToOne(() => Notif, (n) => n.id)
  notif: Notif;
  @CreateDateColumn()
  createdAt?: Date;
  @CreateDateColumn()
  modifiedAt?: Date;
}

@Entity()
export class GroupPrivilage {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Group, (g) => g.id)
  group: Group;
  @Column({
    default: 0,
  })
  isWebPush: number;
  @Column({
    default: 0,
  })
  isEmail: number;
  @Column({
    default: 0,
  })
  isMobilePush: number;
  @Column({
    default: 0,
  })
  isSms: number;
  @Column({
    default: 1,
  })
  isInApp: number;
  @CreateDateColumn()
  createdAt?: Date;
  @CreateDateColumn()
  modifiedAt?: Date;
}

@Entity()
export class NotifGroup {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Notif, (n) => n.id)
  notif: Notif;
  @ManyToOne(() => Group, (g) => g.id)
  group: Group;
  @CreateDateColumn()
  createdAt?: Date;
  @CreateDateColumn()
  modifiedAt?: Date;
}
