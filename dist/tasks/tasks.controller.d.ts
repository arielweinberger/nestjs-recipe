import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';
export declare class TasksController {
    private tasksService;
    private logger;
    constructor(tasksService: TasksService);
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
    getTaskById(id: number, user: User): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    deleteTask(id: number, user: User): Promise<void>;
    updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task>;
}
