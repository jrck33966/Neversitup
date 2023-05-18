import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from '../users/users.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signIn: UserDTO) {
    return this.authService.signIn(signIn.username, signIn.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() user: UserDTO) {
    try {
      return this.authService.signUp(user.username, user.password);
    } catch (error) {
      throw error
    }
  }

}