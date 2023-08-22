import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserdDto } from './dto/update-password.dto';
import { CustomErrors } from 'src/constants/errors';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.findOne(id);
    if (user) {
      return user;
    }
    throw new HttpException(CustomErrors.UserNotExist, HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdateUserdDto,
  ) {
    const { newPassword, oldPassword } = updatePasswordDto;
    const user = await this.usersService.findOne(id);

    if (newPassword === oldPassword) {
      throw new HttpException(
        CustomErrors.PasswordsEquals,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user) {
      throw new HttpException(CustomErrors.UserNotExist, HttpStatus.NOT_FOUND);
    }
    const isIdenticPassword = await bcrypt.compare(
      updatePasswordDto.oldPassword,
      user.password,
    );

    if (!isIdenticPassword) {
      throw new HttpException(
        CustomErrors.OldPasswordWrong,
        HttpStatus.FORBIDDEN,
      );
    }

    if (user) {
      return await this.usersService.update(id, updatePasswordDto);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.remove(id);
  }
}
