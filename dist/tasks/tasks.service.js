"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const common_1 = require("@nestjs/common");
const task_repository_1 = require("./task.repository");
const typeorm_1 = require("@nestjs/typeorm");
let TasksService = class TasksService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    getTasks(filterDto, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.taskRepository.getTasks(filterDto, user);
        });
    }
    getTaskById(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.taskRepository.findOne({ where: { id, userId: user.id } });
            if (!found) {
                throw new common_1.NotFoundException(`Task with ID "${id}" not found`);
            }
            return found;
        });
    }
    createTask(createTaskDto, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.taskRepository.createTask(createTaskDto, user);
        });
    }
    deleteTask(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.taskRepository.delete({ id, userId: user.id });
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Task with ID "${id}" not found`);
            }
        });
    }
    updateTaskStatus(id, status, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.getTaskById(id, user);
            task.status = status;
            yield task.save();
            return task;
        });
    }
};
TasksService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(task_repository_1.TaskRepository)),
    __metadata("design:paramtypes", [task_repository_1.TaskRepository])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map