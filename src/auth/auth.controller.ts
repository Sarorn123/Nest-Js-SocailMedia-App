import {
  Body,
  Controller,
  Get,
  Injectable,
  Post,
  HttpException,
  Put,
  Param,
} from '@nestjs/common';
import { UserLoginDto } from './dto/userLogin.dto';
import { AuthService } from './auth.service';
import { UserSignupDto, UpdateUserDto } from './dto/userSignup.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '../User/users.service';
import { User } from '../User/user.interface';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly AuthService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/signup')
  @UsePipes(ValidationPipe) // Validation data
  singup(@Body() userSignupDto: UserSignupDto): Promise<any> {
    return this.AuthService.signup(userSignupDto);
  }

  @Put('/updateUser/:id')
  @UsePipes(ValidationPipe) // Validation data
  updateUser(
    @Param('id') id,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.editUser(id, updateUserDto);
  }

  @Post('/login')
  login(@Body() dto: UserLoginDto) {
    return this.AuthService.login(dto);
  }
}
