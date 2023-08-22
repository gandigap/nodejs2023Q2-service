import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UpdateUserdDto } from 'src/users/dto/update-password.dto';
import { tokenType } from 'src/constants/token';
import { CustomErrors } from 'src/constants/errors';

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

  async login(authDto: AuthDto) {
    const user = await this.usersService.findByLogin(authDto.login);

    if (!user) {
      throw new ForbiddenException(CustomErrors.UserWithLoginNotExist);
    }

    const isIdenticPassword = await bcrypt.compare(
      authDto.password,
      user.password,
    );

    if (!isIdenticPassword) {
      throw new ForbiddenException(CustomErrors.PasswordsNotEdentic);
    }

    return await this.getTokens(user);
  }

  async refresh({ refreshToken }) {
    if (!refreshToken) {
      throw new UnauthorizedException(CustomErrors.RefreshTokenNotExist);
    }

    try {
      const { userId, login } = this.jwtService.verify(refreshToken);
      const user = new User({ id: userId, login } as any);

      return await this.login(user);
    } catch {
      throw new ForbiddenException(CustomErrors.VerifyFailed);
    }
  }

  async getTokens(user: User) {
    const accessToken = await this.getAccessToken(user);
    const refreshToken = await this.getRefreshToken(user);
    const decodedToken = this.jwtService.decode(accessToken);
    const expiresIn = Math.ceil(+decodedToken['exp'] - Date.now() / 1000);

    return {
      accessToken,
      expiresIn,
      tokenType,
      refreshToken,
    };
  }

  async getAccessToken(user: User): Promise<string> {
    const payload = { sub: user.id, username: user.login };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    return token;
  }

  async getRefreshToken(user: User): Promise<string> {
    const payload = { sub: user.id, username: user.login };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    const decodedToken = this.jwtService.decode(token);

    user.refreshToken = token;
    user.tokenExpirationDate = new Date(
      decodedToken['exp'] * 1000,
    ).toISOString();
    user.version = user.version + 1;
    user.updatedAt = Date.now();

    await this.usersService.update(user.id, user as unknown as UpdateUserdDto);

    return token;
  }
}
