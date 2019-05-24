import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskRepository } from './entities/task.repository';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async getAllTasks(user: User): Promise<Task[]> {
    return this.taskRepository.find({ where: { userId: user.id } });
  }

  async getTasksWithFilters(filterDto: GetTasksFilterDto, user: User) {
    return this.taskRepository.getTasksWithFilters(filterDto, user.id);
  }

  async getTaskById(taskId: number, user: User): Promise<Task> {
    return this.taskRepository.findOneOrThrow(taskId, user.id);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepository.createTask(createTaskDto);
    delete task.user;
    return task;
  }

  async deleteTask(taskId: number, user: User): Promise<void> {
    const task = await this.taskRepository.findOneOrThrow(taskId, user.id);
    await this.taskRepository.remove(task);
  }

  async updateTaskStatus(taskId: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.taskRepository.findOneOrThrow(taskId, user.id);
    task.status = status;
    await task.save();
    return task;
  }
}
