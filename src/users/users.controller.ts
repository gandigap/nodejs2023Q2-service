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
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdatePasswordDto } from './dto/update-password.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    if (this.usersService.findByLogin(createUserDto.login)) {
      throw new HttpException('User exist', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = this.usersService.findOne(id);
    if (user) {
      return user;
    }
    throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    console.log('super update');
    const { newPassword, oldPassword } = updatePasswordDto;
    const user = this.usersService.findOne(id);
    console.log('super update2', user);

    if (newPassword === oldPassword) {
      throw new HttpException('Passwords are equals', HttpStatus.BAD_REQUEST);
    }

    if (user && user.password !== oldPassword) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }

    if (user) {
      return this.usersService.update(id, updatePasswordDto);
    }

    throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = this.usersService.findOne(id);
    if (user) {
      return this.usersService.remove(id);
    }
    throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
  }
}
