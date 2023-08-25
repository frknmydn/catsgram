import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { user } from './User.entity';

@Entity()
export class pets {
  @PrimaryGeneratedColumn()
  pet_id!: number;

  @ManyToOne(() => user)
  user!: user;

  @Column()
  name!: string;

  @Column()
  species!: string;

  @Column({ nullable: true })
  age!: number;

  @Column({ nullable: true })
  photo_url!: string;

  @Column({ nullable: true })
  has_health_issues!: boolean;
}
