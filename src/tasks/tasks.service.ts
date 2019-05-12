import { Injectable } from '@nestjs/common';
import * as uniqid from 'uniqid';

import { TaskStatus, Task } from './task.interface';

@Injectable()
export class TasksService {
  private tasks = [];

  async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async createTask(description: string): Promise<Task> {
    const task = {
      id: uniqid(),
      description,
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);
    return task;
  }
}
