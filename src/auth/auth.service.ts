import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/userLogin.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: '123',
      email: 'john@gmailcom',
    },
  ];

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
