import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { users } from './User.entity';

@Entity()
export class followers {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => users)
  user_id!: users;

  @ManyToOne(() => users)
  followers_user_id!: users;
  
  @Column({ nullable: true })
  follow_date!: Date;

}
