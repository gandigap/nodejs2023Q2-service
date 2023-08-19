import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(authDto: AuthDto) {
    return await this.usersService.create(authDto);
  }

  async signIn(user: User) {
    const currentUser = await this.usersService.findOne(user.id);

    if (user?.password !== currentUser.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.login };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async refresh({ refreshToken }) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
  }

  async checkUser(login: string, password: string) {
    const userByLogin = await this.usersService.findByLogin(login);

    if (!userByLogin) {
      return null;
    }

    const isIdenticPassword = await bcrypt.compare(
      userByLogin.password,
      password,
    );

    if (!isIdenticPassword) {
      return null;
    }

    return userByLogin;
  }
}
