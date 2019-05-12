import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TasksController {

  @Get()
  getAllTasks() {
    return ['task1', 'task2', 'task3'];
  }
}
