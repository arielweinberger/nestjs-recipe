import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskRepository } from './entities/task.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([TaskRepository]),
  ],
  controllers: [
    TasksController,
  ],
  providers: [
    TasksService,
  ],
})
export class TasksModule {}
