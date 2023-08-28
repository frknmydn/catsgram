import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// Kullanıcıları temsil eden başka bir entity kullanılıyor varsayalım

@Entity()
export class profile_report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reason: string; // Raporlama nedeni

  @Column()
  reported_user_id: number; // Raporlanan kullanıcının ID'si

  @Column()
  reporter_user_id: number; // Raporlayan kullanıcının ID'si

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date; // Rapor oluşturulma tarihi

  @Column({ default: false })
  is_approved: boolean; // Rapor onay durumu

  @Column({ nullable: true })
  moderator_user_id: number | null; // moderator'un ID'si

  @Column({ type: 'timestamp', nullable: true })
  approved_at: Date | null; // Raporun onaylandığı tarih
}
