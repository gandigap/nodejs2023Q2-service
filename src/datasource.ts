import { DataSource } from 'typeorm';
import 'dotenv/config';
import { User } from './users/entities/user.entity';

const {
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_PORT,
  TYPEORM_HOST,
} = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: TYPEORM_HOST,
  port: +TYPEORM_PORT,
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE,
  synchronize: false,
  entities: [User],
  migrations: ['dist/migrations/*.js'],
  logging: false,
});
