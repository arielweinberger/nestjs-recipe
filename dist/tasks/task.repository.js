"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_entity_1 = require("./task.entity");
const typeorm_1 = require("typeorm");
const task_status_enum_1 = require("./task-status.enum");
const common_1 = require("@nestjs/common");
let TaskRepository = class TaskRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('TaskRepository');
    }
    getTasks(filterDto, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, search } = filterDto;
            const query = this.createQueryBuilder('task');
            query.where('task.userId = :userId', { userId: user.id });
            if (status) {
                query.andWhere('task.status = :status', { status });
            }
            if (search) {
                query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
            }
            try {
                const tasks = yield query.getMany();
                return tasks;
            }
            catch (error) {
                this.logger.error(`Failed to get tasks for user "${user.username}". Filters: ${JSON.stringify(filterDto)}`, error.stack);
                throw new common_1.InternalServerErrorException();
            }
        });
    }
    createTask(createTaskDto, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description } = createTaskDto;
            const task = new task_entity_1.Task();
            task.title = title;
            task.description = description;
            task.status = task_status_enum_1.TaskStatus.OPEN;
            task.user = user;
            try {
                yield task.save();
            }
            catch (error) {
                this.logger.error(`Failed to create a task for user "${user.username}". Data: ${createTaskDto}`, error.stack);
                throw new common_1.InternalServerErrorException();
            }
            delete task.user;
            return task;
        });
    }
};
TaskRepository = __decorate([
    typeorm_1.EntityRepository(task_entity_1.Task)
], TaskRepository);
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=task.repository.js.map