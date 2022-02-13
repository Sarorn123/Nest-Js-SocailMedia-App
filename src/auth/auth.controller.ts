import { Body, Controller, Get, Injectable, Post } from '@nestjs/common';
import { UserLoginDto } from './dto/userLogin.dto';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('/auth/login')
  login(@Body() dto: UserLoginDto) {
    return this.AuthService.login(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('test')
  getTest(): string {
    return 'testing jwt';
  }
}
