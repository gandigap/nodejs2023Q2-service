import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entity/user.entity';

@Injectable()
export class DBService {
  users: UserEntity[] = [];
}
