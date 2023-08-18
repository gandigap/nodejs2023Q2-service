import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  async signup(@Body() authDto: AuthDto) {
    return await this.authService.signup(authDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Request() request) {
    return this.authService.signIn(request.body);
  }

  @Public()
  @Post('/refresh')
  async refresh(@Request() request) {
    return this.authService.refresh(request.body);
  }
}
