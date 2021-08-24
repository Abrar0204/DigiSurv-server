import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
export const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'test',
  entities: ['dist/src/**/entities/*.entity{.ts,.js}'],
  synchronize: true,
};
