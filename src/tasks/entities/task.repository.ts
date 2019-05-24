import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from '../task-status.interface';
import { User } from '../../auth/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasksWithFilters(filterDto: GetTasksFilterDto, userId: number): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = await this.createQueryBuilder('task')
      .where('task.userId = :userId', { userId });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%`});
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, user } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    return task.save();
  }

  async findOneOrThrow(taskId: number, userId: number) {
    const found = await this.findOne({ where: { id: taskId, userId } });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }
}
