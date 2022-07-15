import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { entities } from './register.enities';

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: false,
  synchronize: ['dev', 'test'].includes(process.env.NODE_ENV),
  keepConnectionAlive: process.env.NODE_ENV == 'test',
  entities,
  ssl: false,
  migrationsRun: true,
};

export const ORM_CONFIG = {
  ...typeOrmModuleOptions,
  migrations: ['./src/core/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/core/database/migrations',
  },
};

module.exports = ORM_CONFIG;
