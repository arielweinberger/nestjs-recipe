import { Test } from '@nestjs/testing';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';
import { TaskStatus } from './task-status.enum';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { MockLogger } from '../util/logger.mock';

const mockUser = { id: 1, username: 'Mock User' } as User;

jest.mock('../auth/user.entity', () => ({
  save: jest.fn(),
}));

describe('TaskRepository', () => {
  let mockLogger: MockLogger;
  let taskRepository: TaskRepository;

  beforeEach(async () => {
    mockLogger = new MockLogger('TaskRepository');
    taskRepository = new TaskRepository();
    (taskRepository as any).logger = mockLogger;
  });

  describe('getTasks', () => {
    let filterDto: GetTasksFilterDto;
    let queryMethods;

    beforeEach(() => {
      queryMethods = {
        where: jest.fn(),
        andWhere: jest.fn(),
        getMany: jest.fn(),
      };

      taskRepository.createQueryBuilder = jest.fn().mockReturnValue(queryMethods);
    });

    it('gets tasks using query builder', () => {
      filterDto = { status: null, search: null };

      expect(taskRepository.getTasks(filterDto, mockUser)).resolves.not.toThrow();
      expect(taskRepository.createQueryBuilder).toHaveBeenCalledWith('task');
      expect(queryMethods.where).toHaveBeenCalledWith('task.userId = :userId', { userId: mockUser.id });
      expect(queryMethods.andWhere).not.toHaveBeenCalled();
      expect(queryMethods.getMany).toHaveBeenCalled();
    });

    it('gets tasks with status filter', () => {
      filterDto = { status: TaskStatus.DONE, search: null };
      taskRepository.getTasks(filterDto, mockUser);

      expect(queryMethods.andWhere).toHaveBeenCalledTimes(1);
      expect(queryMethods.andWhere).toHaveBeenCalledWith('task.status = :status', { status: filterDto.status });
    });

    it('gets tasks with search filter', () => {
      filterDto = { status: null, search: 'Test' };
      taskRepository.getTasks(filterDto, mockUser);

      expect(queryMethods.andWhere).toHaveBeenCalledTimes(1);
      expect(queryMethods.andWhere).toHaveBeenCalledWith(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${filterDto.search}%` },
      );
    });

    it('gets tasks with both status and search filters', () => {
      filterDto = { status: TaskStatus.DONE, search: 'Test' };
      taskRepository.getTasks(filterDto, mockUser);

      expect(queryMethods.andWhere).toHaveBeenCalledTimes(2);
    });

    it('throws error if retrieving tasks fails', async () => {
      queryMethods.getMany = jest.fn().mockRejectedValue(new Error('Woops!'));
      filterDto = { status: null, search: null };
      await expect(taskRepository.getTasks(filterDto, mockUser)).rejects.toThrow(InternalServerErrorException);
      expect(mockLogger.error).toHaveBeenCalled();
    });
  });

  describe('createTask', () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Test title',
      description: 'Test description'
    };

    it('creates a task', async () => {
      const save = jest.fn();
      taskRepository.create = jest.fn().mockImplementation(() => ({ save }));

      const result = await taskRepository.createTask(createTaskDto, mockUser);
      expect(save).toHaveBeenCalled();
      expect(result.title).toEqual(createTaskDto.title);
      expect(result.description).toEqual(createTaskDto.description);
      expect(result.status).toEqual(TaskStatus.OPEN);
      expect(result.user).not.toBeDefined();
    });

    it('throws an error as task saving failed', async () => {
      const save = jest.fn().mockRejectedValue(new Error('Woops!'));

      taskRepository.create = jest.fn().mockImplementation(() => ({ save }));
      await expect(taskRepository.createTask(createTaskDto, mockUser)).rejects.toThrow(InternalServerErrorException);
      expect(mockLogger.error).toHaveBeenCalled();
    });
  });
});
