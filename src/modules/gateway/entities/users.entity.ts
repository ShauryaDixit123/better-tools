import {
  Column,
  CreateDateColumn,
  Entity,
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
    // unique: true,
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
