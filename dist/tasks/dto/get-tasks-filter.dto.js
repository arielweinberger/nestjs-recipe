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
const task_status_enum_1 = require("../task-status.enum");
const class_validator_1 = require("class-validator");
class GetTasksFilterDto {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsIn([task_status_enum_1.TaskStatus.OPEN, task_status_enum_1.TaskStatus.IN_PROGRESS, task_status_enum_1.TaskStatus.DONE]),
    __metadata("design:type", String)
], GetTasksFilterDto.prototype, "status", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], GetTasksFilterDto.prototype, "search", void 0);
exports.GetTasksFilterDto = GetTasksFilterDto;
//# sourceMappingURL=get-tasks-filter.dto.js.map