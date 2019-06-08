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
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./user.entity");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    signUp(authCredentialsDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = authCredentialsDto;
            const user = new user_entity_1.User();
            user.username = username;
            user.salt = yield bcrypt.genSalt();
            user.password = yield this.hashPassword(password, user.salt);
            try {
                yield user.save();
            }
            catch (error) {
                if (error.code === '23505') {
                    throw new common_1.ConflictException('Username already exists');
                }
                else {
                    throw new common_1.InternalServerErrorException();
                }
            }
        });
    }
    validateUserPassword(authCredentialsDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = authCredentialsDto;
            const user = yield this.findOne({ username });
            if (user && (yield user.validatePassword(password))) {
                return user.username;
            }
            else {
                return null;
            }
        });
    }
    hashPassword(password, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt.hash(password, salt);
        });
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map