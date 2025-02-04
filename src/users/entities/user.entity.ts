import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column({ nullable: true })
  username: string;
  @Column({ nullable: false })
  password: string;
  @Column({ default: true })
  isActive: boolean;
  @Column({ type: 'enum', enum: Role, default: Role.GUEST })
  role: Role;
  @Column({ nullable: false })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
