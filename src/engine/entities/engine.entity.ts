import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Engine {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  name: string;
  @Column({ type: 'simple-array', nullable: true })
  apiKeys: string[];
  @Column({ type: 'simple-array', nullable: false })
  urls: string[];
  @Column({ type: 'simple-array', nullable: true })
  headers: string[];
  @Column()
  body: string;
  @Column({ default: true })
  isActive: boolean;
  @Column({ nullable: false })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
