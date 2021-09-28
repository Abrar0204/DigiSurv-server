import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
export const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'mysecretpassword',
  database: process.env.POSTGRES_DATABASE || 'test',
  entities: ['dist/src/entities/*.entity{.ts,.js}'],
  synchronize: true,
};
