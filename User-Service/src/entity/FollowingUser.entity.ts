import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { user } from './User.entity';

@Entity()
export class followings {
  @PrimaryGeneratedColumn()
  following_id!: number;

  @ManyToOne(() => user)
  user!: user;

  @ManyToOne(() => user)
  followingUser!: user;
}
