import config from './index';
import { DataSourceOptions } from 'typeorm';
import * as path from 'path';

const options: DataSourceOptions = {
  ...config.database,
  type: 'mysql',
  entities: [path.join(__dirname + '/**/*.entity.{ts, js}')],
  migrationsRun: true,
  migrations: [path.join(__dirname) + './migrations/*.{ts, js}'],
  synchronize: false,
};

export default options;
