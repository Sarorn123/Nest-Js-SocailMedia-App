import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/userLogin.dto';
import { UserSignupDto } from './dto/userSignup.dto';
import { UserService } from '../User/user.service';
import { User } from '../User/user.interface';
import { comparePassword } from '../Hash/Bcrypt';
import { userConverter } from '../User/Convert/user.convert';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signup(userSignupDto: UserSignupDto): Promise<User> {
    if (userSignupDto.password !== userSignupDto.confirm_password) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Confirm password not match!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.userService.addUser(userSignupDto);
  }

  async login(userLoginDto: UserLoginDto) {
    const user = await this.userService.LoginUser(userLoginDto);
    if (!user) {
      throw new UnauthorizedException({ message: 'Invalid cridentail' });
    }

    if (!comparePassword(userLoginDto.password, user.password)) {
      throw new UnauthorizedException({ message: 'Invalid password' });
    }
    return this.userToJwtToken(user, user.id, user.email_or_phone, user.role);
  }

  userToJwtToken(
    user: User,
    userId: string,
    email: string,
    type: string,
  ): Object {
    const token = this.jwtService.sign({
      sub: userId,
      email,
      type: type,
    });
    return {
      user: userConverter(user),
      jwt_token: token,
      modules: this.modules,
    };
  }

  readonly modules = [
    {
      id: 1,
      name: 'Home',
      url: '/home',
      icon: null,
    },
    {
      id: 2,
      name: 'Profile',
      url: '/profile',
      icon: null,
    },
  ];
}
