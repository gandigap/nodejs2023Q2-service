import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
// import { InitialSchema1691438690020 } from 'src/migrations/1691438690020-initial-schema';
import { User } from 'src/users/entities/user.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('TYPEORM_HOST'),
  port: configService.get<number>('TYPEORM_PORT'),
  username: configService.get<string>('TYPEORM_USERNAME'),
  password: configService.get<string>('TYPEORM_PASSWORD'),
  database: configService.get<string>('TYPEORM_DATABASE'),
  logging: configService.get<boolean>('TYPEORM_LOGGING'),
  entities: [User],
  // migrations: [InitialSchema1691438690020],
});
