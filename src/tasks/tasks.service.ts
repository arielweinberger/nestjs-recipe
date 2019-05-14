import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [];

  async getAllTasks() {
    return this.tasks;
  }
}
