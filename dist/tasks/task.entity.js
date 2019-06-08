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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const task_status_enum_1 = require("./task-status.enum");
const user_entity_1 = require("../auth/user.entity");
let Task = class Task extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Task.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Task.prototype, "status", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.tasks, { eager: false }),
    __metadata("design:type", user_entity_1.User)
], Task.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Task.prototype, "userId", void 0);
Task = __decorate([
    typeorm_1.Entity()
], Task);
exports.Task = Task;
//# sourceMappingURL=task.entity.js.map