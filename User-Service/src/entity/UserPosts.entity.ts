import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { user } from './User.entity'

@Entity()
export class UserPost {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  post_id: number;

  @ManyToOne(() => user)
  user: user;
}