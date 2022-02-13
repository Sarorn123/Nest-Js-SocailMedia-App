import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const db: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'mydb',
  synchronize: true,
  // logging: false,
  entities: ['src/**/*entity.js'],
  // entities: ['dist/src/**/*entity.ts'],
  // migrations: ['src/migration/**/*.ts'],
};

export default db;
