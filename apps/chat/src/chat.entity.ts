import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { ContentType } from "common/entities/type.entity";
import { ServiceUser, User } from "apps/gateway/src/entities/users.entity";
// import { ServiceUser } from "apps/gateway/src/entities/users.entity";

@Entity()
export class ChatRoom {
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
  isPermanent: number;
  @Column({
    default: 1,
  })
  isActive: number;
  @ManyToOne(() => ServiceUser, (su) => su.id)
  roomOwner: string;

  @CreateDateColumn()
  createdAt: Date;
  @CreateDateColumn()
  modifiedAt: Date;
}
@Entity()
// @Index(["serviceUser", "chatRoom"], { unique: true })
export class ServiceUserChatRoom {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    default: 1,
  })
  isActive?: number;

  @ManyToOne(() => ServiceUser, (su) => su.id)
  serviceUser: ServiceUser;
  @ManyToOne(() => ChatRoom, (cr) => cr.id)
  chatRoom: ChatRoom;

  @CreateDateColumn()
  createdAt?: Date;
  @CreateDateColumn()
  modifiedAt?: Date;
}
@Entity()
export class ChatEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  message: string;
  @Column({
    default: 1,
  })
  isActive: number;
  @Column()
  s3Path: string;

  @ManyToOne(() => ContentType, (ce) => ce.id)
  type: string;
  @ManyToOne(() => ServiceUser, (su) => su.id)
  sender: string;
  @ManyToOne(() => ChatRoom, (cr) => cr.id)
  chatRoom: string;

  @CreateDateColumn()
  createdAt: Date;
  @CreateDateColumn()
  modifiedAt: Date;
}
@Entity()
export class ChatHeirarchy {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ChatEntity, (ce) => ce.id)
  chatEntity: string;
  @ManyToOne(() => ChatHeirarchy, (ce) => ce.id, {
    nullable: true,
  })
  parent: string;

  @CreateDateColumn()
  createdAt: Date;
  @CreateDateColumn()
  modifiedAt: Date;
}