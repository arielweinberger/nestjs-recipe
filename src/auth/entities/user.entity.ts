import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { NotFoundException } from '@nestjs/common';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(type => Task, task => task.user, { eager: true })
  tasks: Task[];

  validatePassword(password: string): boolean {
    return this.password === password;
  }

  validateTaskOwnershipOrThrow(taskId: number): boolean {
    const ownedTask = this.tasks.find(task => task.id === taskId);

    if (!Boolean(ownedTask)) {
      throw new NotFoundException();
    }

    return true;
  }
}
