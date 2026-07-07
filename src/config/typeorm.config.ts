import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

const options: TypeOrmModuleOptions & DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '102030',
  database: 'pedaladb',
  autoLoadEntities: true,

  //entities: [`${__dirname}/../modules/**/*.model{.js,.ts}`],
  migrations: [join(__dirname, '..', 'database', 'migrations', '*{.ts,.js}')],

  migrationsRun: true,
  synchronize: false,
};

// Exporta para uso no NestJS
export const typeOrmConfig = options;
