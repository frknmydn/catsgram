import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { users } from './User.entity';

@Entity()
export class blocked_users {
  @PrimaryGeneratedColumn()
  blocked_id!: number;

  @ManyToOne(() => users)
  user!: users;

  @ManyToOne(() => users)
  blockedUser!: users;

}
