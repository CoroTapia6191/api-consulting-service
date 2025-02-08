import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column({ unique: true, nullable: false })
  username: string;
  @Column({ nullable: false })
  password: string;
  @Column({ default: true })
  isActive: boolean;
  @Column({ type: 'simple-array', nullable: false })
  roles: Role[];
  @Column({ nullable: true })
  ip: string;
  @Column({ nullable: true })
  proxy: string;
  @Column({ nullable: false })
  token: string;
  @Column({ nullable: false })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
