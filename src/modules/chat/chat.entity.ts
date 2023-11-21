import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ServiceUser, User } from "../gateway/entities/users.entity";
import { ContentType } from "src/common/entities/type.entity";

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
  @Column()
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

export class ServiceUserChatRoom {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    default: 1,
  })
  isActive: number;

  @ManyToOne(() => ServiceUser, (su) => su.id)
  serviceUser: string;
  @ManyToOne(() => ChatRoom, (cr) => cr.id)
  chatRoom: string;

  @CreateDateColumn()
  createdAt: Date;
  @CreateDateColumn()
  modifiedAt: Date;
}

export class ChatEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;
  @Column()
  message: string;
  @Column()
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

export class ChatHeirarchy {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ChatEntity, (ce) => ce.id)
  chatEntity: string;
  @ManyToOne(() => ChatEntity, (ce) => ce.id)
  parent: string;

  @CreateDateColumn()
  createdAt: Date;
  @CreateDateColumn()
  modifiedAt: Date;
}
