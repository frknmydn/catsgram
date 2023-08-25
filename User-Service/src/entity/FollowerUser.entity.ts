import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { user } from './User.entity';

@Entity()
export class followers {
  @PrimaryGeneratedColumn()
  follower_id!: number;

  @ManyToOne(() => user)
  user!: user;

  @ManyToOne(() => user)
  followerUser!: user;
}
