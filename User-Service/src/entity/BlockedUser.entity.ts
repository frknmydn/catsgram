import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { user } from './User.entity';

@Entity()
export class blocked_users {
  @PrimaryGeneratedColumn()
  blocked_id!: number;

  @ManyToOne(() => user)
  user!: user;

  @ManyToOne(() => user)
  blockedUser!: user;
}
