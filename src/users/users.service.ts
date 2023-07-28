import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DBService } from 'src/db/db.service';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(private db: DBService) {}

  create(createUserDto: CreateUserDto) {
    const user = new UserEntity(createUserDto);
    this.db.users.push(user);

    return user;
  }

  findAll() {
    return this.db.users;
  }

  findOne(id: string): UserEntity | undefined {
    return this.db.users.find((user) => user.id === id);
  }

  update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): UserEntity | undefined {
    const user = this.db.users.find((user) => user.id === id);
    user.password = updatePasswordDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return user;
  }

  remove(id: string) {
    const userIndex = this.db.users.findIndex((user) => user.id === id);
    this.db.users.splice(userIndex, 1);
  }

  findByLogin(login: string): UserEntity | undefined {
    return this.db.users.find((user) => user.login === login);
  }
}
