import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/users/entities/user.entity';

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
}
