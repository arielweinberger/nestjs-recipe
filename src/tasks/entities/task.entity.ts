import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { TaskStatus } from '../task-status.interface';

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
}
