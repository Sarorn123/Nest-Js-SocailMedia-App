import {
  Body,
  Controller,
  Get,
  Injectable,
  Post,
  HttpException,
} from '@nestjs/common';
import { UserLoginDto } from './dto/userLogin.dto';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserSignupDto } from './dto/userSignup.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Controller('/auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe) // Validation data
  async singup(@Body() userSignupDto: UserSignupDto): Promise<any> {
    return this.AuthService.signup(userSignupDto);
  }

  @Post('/login')
  login(@Body() dto: UserLoginDto) {
    return this.AuthService.login(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('test')
  getTest(): string {
    return 'testing jwt';
  }
}
