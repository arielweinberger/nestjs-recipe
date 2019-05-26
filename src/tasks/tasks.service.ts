import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async getAllTasks(user: User): Promise<Task[]> {
    return this.taskRepository.find({ where: { userId: user.id } });
  }

  async getTasksWithFilters(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasksWithFilters(filterDto, user.id);
  }

  async getTaskById(taskId: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id: taskId, userId: user.id } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${taskId}" not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepository.createTask(createTaskDto);
    delete task.user;
    return task;
  }

  async deleteTask(taskId: number, user: User): Promise<void> {
    const task = await this.getTaskById(taskId, user);
    await this.taskRepository.remove(task);
  }

  async updateTaskStatus(taskId: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(taskId, user);
    task.status = status;
    await task.save();
    return task;
  }
}
