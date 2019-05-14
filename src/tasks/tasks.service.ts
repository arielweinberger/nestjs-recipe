import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks = [];

  async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }
}
