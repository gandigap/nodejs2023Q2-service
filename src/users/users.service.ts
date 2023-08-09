import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserdDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomErrors } from 'src/constants/errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
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
}
