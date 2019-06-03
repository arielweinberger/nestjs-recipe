import { TaskStatus } from '../task-status.enum';
import { IsOptional, IsIn, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class GetTasksDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  pageSize: number = 10;
}
