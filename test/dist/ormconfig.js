"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'mydb',
    synchronize: true,
    entities: ['src/**/*entity.js'],
};
exports.default = db;
//# sourceMappingURL=ormconfig.js.map