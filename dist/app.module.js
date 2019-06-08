"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tasks_module_1 = require("./tasks/tasks.module");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_config_1 = require("./config/typeorm.config");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeOrmConfig),
            tasks_module_1.TasksModule,
            auth_module_1.AuthModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map