import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksDto } from './dto/get-tasks.dto';
import { PaginatedResult } from '../shared/paginated-result.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasksWithFilters(getTasksDto: GetTasksDto): Promise<PaginatedResult<Task>> {
    const { status, search, page, pageSize } = getTasksDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
    }

    const count = await query.getCount();
    query.offset((page - 1) * pageSize);
    query.limit(pageSize);

    const tasks = await query.getMany();

    return {
      data: tasks,
      pagination: {
        count,
        pageSize,
        page,
      },
    };
  }

  private wrapPaginatedResponse(paginationData) {

  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }
}
