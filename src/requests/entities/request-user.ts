import { Column, Entity } from 'typeorm';

@Entity()
export class RequestUser {
  @Column({ nullable: false, primary: true })
  user: number;
  @Column({ nullable: false })
  numberRequests: number;
}
