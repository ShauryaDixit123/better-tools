import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({
    nullable: false,
  })
  firstName: string;
  @Column({
    nullable: false,
  })
  lastName: string;
  @Column({
    nullable: false,
  })
  apiKey: string;
  @Column({
    nullable: false,
  })
  email: string;
  @Column({
    nullable: false,
  })
  password: string;
  @CreateDateColumn()
  createdAt: Date;
  @CreateDateColumn()
  modifiedAt: Date;
}

@Entity()
@Index(["uniqueId", "parentUser"], { unique: true })
export class ServiceUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({
    nullable: false,
  })
  uniqueId: string;
  @Column({
    default: 1,
  })
  isActive: number;
  @ManyToOne(() => User, (user) => user.id)
  parentUser: string;

  @CreateDateColumn()
  createdAt: Date;
  @CreateDateColumn()
  modifiedAt: Date;
}
