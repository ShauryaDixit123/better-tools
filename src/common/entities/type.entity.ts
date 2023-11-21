import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class ContentType {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;
  @CreateDateColumn()
  modifiedAt: Date;
}
