import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
export class UserEntity {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(createUserDto: Partial<CreateUserDto>) {
    const timestamp = Date.now();
    this.id = uuidv4();
    this.login = createUserDto.login;
    this.password = createUserDto.password;
    this.version = 1;
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }
}
