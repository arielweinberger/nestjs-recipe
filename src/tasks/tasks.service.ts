import { Injectable } from '@nestjs/common';
import * as uniqid from 'uniqid';

import { TaskStatus } from './task.interface';

@Injectable()
export class TasksService {
  private tasks = [];

  async getAllTasks() {
    return this.tasks;
  }

  async createTask(description: string) {
    const task = {
      id: uniqid(),
      description,
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);
    return task;
  }
}
