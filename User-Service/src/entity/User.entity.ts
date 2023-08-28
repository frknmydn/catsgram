import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class users {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column()
  username!: string;

  @Column({ nullable: true })
  full_name!: string;

  @Column({ nullable: true })
  birthdate!: Date;

  @Column({ nullable: true })
  profile_picture_url!: string;

  @Column({ default: 0 })
  report_count!: number;

  @Column({ default: 0 })
    follower_count!: number;

  @Column({ default: 0 })
    following_count!: number;

    @Column({ default: false })
    isBanned: boolean;
}