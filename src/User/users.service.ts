import { Injectable } from '@nestjs/common';
import { UserSignupDto } from '../auth/dto/userSignup.dto';
import { bcryptPassword } from '../Hash/Bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  async addUser(user: UserSignupDto): Promise<User> {
    const password = bcryptPassword(user.password);
    const new_user = { ...user, password };
    return await this.userModel.create(new_user);
  }
}
