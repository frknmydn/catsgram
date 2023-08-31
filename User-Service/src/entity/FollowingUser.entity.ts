import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { users } from './User.entity';

@Entity()
export class followings {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => users)
  user_id!: users;

  @ManyToOne(() => users)
  followings_user_id!: users;

  @Column({ nullable: true })
  follow_date!: Date;
}
