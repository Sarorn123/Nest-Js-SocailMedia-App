import { Body, Controller, Post, Put, Param } from '@nestjs/common';
import { UserLoginDto } from './dto/userLogin.dto';
import { AuthService } from './auth.service';
import { UserSignupDto, UpdateUserDto } from './dto/userSignup.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '../User/user.service';
import { User } from '../User/user.interface';
import { Public } from './route.protection';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('/signup')
  @UsePipes(ValidationPipe) // Validation data
  singup(@Body() userSignupDto: UserSignupDto): Promise<any> {
    return this.authService.signup(userSignupDto);
  }

  @Put('/updateUser/:id')
  @UsePipes(ValidationPipe) // Validation data
  updateUser(
    @Param('id') id,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.editUser(id, updateUserDto);
  }

  @Public()
  @Post('/login')
  login(@Body() userLogindto: UserLoginDto) {
    return this.authService.login(userLogindto);
  }
}
