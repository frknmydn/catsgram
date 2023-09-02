import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { users } from "./User.entity";

@Entity()
export class followers {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => users)
  follower_user_id!: users;

  @ManyToOne(() => users)
  following_user_id!: users;

  @Column({ nullable: true })
  follow_date!: Date;

  @Column({ nullable: true })
  isApproved!: boolean;
}
