import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserdDto } from './dto/update-password.dto';
import { DBService } from 'src/db/db.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private db: DBService) {}

  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    this.db.users.push(user);

    return user;
  }

  findAll() {
    return this.db.users;
  }

  findOne(id: string): User | undefined {
    return this.db.users.find((user) => user.id === id);
  }

  update(id: string, updateUserdDto: UpdateUserdDto): User | undefined {
    const user = this.db.users.find((user) => user.id === id);
    user.password = updateUserdDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return user;
  }

  remove(id: string) {
    const userIndex = this.db.users.findIndex((user) => user.id === id);
    this.db.users.splice(userIndex, 1);
  }

  findByLogin(login: string): User | undefined {
    return this.db.users.find((user) => user.login === login);
  }
}
