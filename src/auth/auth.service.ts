import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/userLogin.dto';
import { UserSignupDto } from './dto/userSignup.dto';
import { UserService } from '../User/users.service';
import { User } from '../User/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: '123',
      email: 'john@gmailcom',
    },
  ];

  async signup(userSignupDto: UserSignupDto): Promise<User> {
    if (userSignupDto.password !== userSignupDto.confirm_password) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'confirm password not match!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.userService.addUser(userSignupDto);
  }

  async login(userLoginData: UserLoginDto) {
    const user = this.users.find(
      (user) => user.username === userLoginData.username,
    );
    if (!user) {
      throw new UnauthorizedException('invalid cridentail');
    }
    if (user.password !== userLoginData.password) {
      throw new UnauthorizedException('password not correct!');
    }

    return this.userToJwtToken(user.userId, user.email, 'admin');
  }

  userToJwtToken(userId: number, email: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      type: type,
    });
  }
}
