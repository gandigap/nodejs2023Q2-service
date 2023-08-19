import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { CustomErrors } from 'src/constants/errors';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserdDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    user.password = await this.hashing(user.password);
    await this.userRepository.insert(user);
    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async update(
    id: string,
    updateUserdDto: UpdateUserdDto,
  ): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ id });
    user.password = updateUserdDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    user.createdAt = +user.createdAt;
    await this.userRepository.save(user);
    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(CustomErrors.UserNotExist, HttpStatus.NOT_FOUND);
    }
    await this.userRepository.delete(id);
  }

  async hashing(password: string): Promise<string> {
    return await bcrypt.hash(password, +process.env.CRYPT_SALT);
  }

  async findByLogin(login: string) {
    return await this.userRepository.findOne({ where: { login } });
  }
}
