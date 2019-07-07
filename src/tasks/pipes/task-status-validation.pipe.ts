import { TaskStatus } from './../task.model';
import { PipeTransform, BadRequestException } from '@nestjs/common';

export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: any) {

    if (!Object.values(TaskStatus).includes(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }
}
