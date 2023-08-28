import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { users } from './User.entity';

@Entity()
export class followers {
  @PrimaryGeneratedColumn()
  follower_id!: number;

  @ManyToOne(() => users)
  user!: users;

  @ManyToOne(() => users)
  followerUser!: users;
}
