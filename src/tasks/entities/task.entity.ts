import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinTable } from 'typeorm';
import { TaskStatus } from '../task-status.interface';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(type => User, user => user.tasks, { eager: false })
  user: User;

  @Column({ type: 'int' })
  userId: number;
}
