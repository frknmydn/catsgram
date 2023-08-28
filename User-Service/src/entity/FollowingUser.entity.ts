import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { users } from './User.entity';

@Entity()
export class followings {
  @PrimaryGeneratedColumn()
  following_id!: number;

  @ManyToOne(() => users)
  user!: users;

  @ManyToOne(() => users)
  followingUser!: users;
}
