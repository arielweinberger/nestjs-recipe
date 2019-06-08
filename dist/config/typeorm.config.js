"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
const dbConfig = config.get('db');
exports.typeOrmConfig = {
    type: dbConfig.type,
    host: process.env.DB_HOST || dbConfig.host,
    port: process.env.DB_PORT || dbConfig.port,
    username: process.env.DB_USERNAME || dbConfig.username,
    password: process.env.DB_PASSWORD || dbConfig.password,
    database: process.env.DB_DATABASE || dbConfig.database,
    entities: [__dirname + '/../**/*.entity.ts'],
    synchronize: dbConfig.synchronize,
};
//# sourceMappingURL=typeorm.config.js.map