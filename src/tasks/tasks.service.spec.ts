import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { User } from 'src/auth/user.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Test } from '@nestjs/testing';

const mockUser = { id: 1, username: 'Mock User' } as User;

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
});

describe('TaskService', () => {
  let tasksService: TasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    taskRepository = await module.get<TaskRepository>(TaskRepository);
    tasksService = await module.get<TasksService>(TasksService);
  });

  it('gets all tasks', () => {
    taskRepository.getTasks = jest.fn();

    const mockFilterDto: GetTasksFilterDto = {
      status: TaskStatus.IN_PROGRESS,
      search: 'Mock task search',
    };

    tasksService.getTasks(mockFilterDto, mockUser);
    expect(taskRepository.getTasks).toHaveBeenCalledWith(mockFilterDto, mockUser);
  });

  describe('getTaskById', () => {
    it('calls taskRepository.findOne() and successfully gets a task', async () => {
      taskRepository.findOne.mockResolvedValue({
        title: 'Test task',
        description: 'Test description',
      });

      const result = await tasksService.getTaskById(12, mockUser);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 12,
          userId: mockUser.id,
        },
      });

      expect(result.title).toEqual('Test task');
      expect(result.description).toEqual('Test description');
    });

    it('throws an error as task is not found', async () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById(12, mockUser)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createTask', () => {
    it('calls taskRepository.createTask()', () => {
      expect(taskRepository.createTask).not.toHaveBeenCalled();
      tasksService.createTask({} as CreateTaskDto, mockUser);
      expect(taskRepository.createTask).toHaveBeenCalled();
    });
  });

  describe('deleteTask', () => {
    it ('calls taskRepository.delete()', () => {
      taskRepository.delete.mockResolvedValue({ affected: 1 });
      expect(taskRepository.delete).not.toHaveBeenCalled();
      tasksService.deleteTask(12, mockUser);
      expect(taskRepository.delete).toHaveBeenCalled();
    });

    it ('throws an exception as task is not found', () => {
      taskRepository.delete.mockResolvedValue({ affected: 0 });
      expect(tasksService.deleteTask(12, mockUser)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateTaskStatus', () => {
    it('retrieves and updates a task', async () => {
      const save = jest.fn();

      tasksService.getTaskById = jest.fn().mockResolvedValue({
        save,
        status: TaskStatus.OPEN,
      });

      const result = await tasksService.updateTaskStatus(12, TaskStatus.IN_PROGRESS, mockUser);
      expect(tasksService.getTaskById).toHaveBeenCalledWith(12, mockUser);
      expect(save).toHaveBeenCalled();
      expect(result.status).toEqual(TaskStatus.IN_PROGRESS);
    });
  });
});
