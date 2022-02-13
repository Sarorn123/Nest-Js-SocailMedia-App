import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/userLogin.dto';
import { UserSignupDto } from './dto/userSignup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../User/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../User/users.service';
import { checkUserName } from './Condition/user.signup.condition';

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
    if (!userSignupDto.email && !userSignupDto.phone_number) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'email or phone require!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (userSignupDto.password !== userSignupDto.confirm_password) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'confirm password not match!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.userService.createUser(userSignupDto);
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
