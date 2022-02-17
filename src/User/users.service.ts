import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserSignupDto, UpdateUserDto } from '../auth/dto/userSignup.dto';
import { bcryptPassword, comparePassword } from '../Hash/Bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { userConverter } from './Convert/user.convert';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  async addUser(user: UserSignupDto): Promise<any> {
    const password = bcryptPassword(user.password);
    const new_user = { ...user, password };
    const userObject = await this.userModel.create(new_user);
    return userConverter(userObject);
  }

  async editUser(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException(
        { message: 'User Not Found!', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (updateUserDto.password) {
      if (!updateUserDto.confirm_password) {
        throw new HttpException(
          { message: 'confirm_password Is Requred!', status: false },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (updateUserDto.password !== updateUserDto.confirm_password) {
        throw new HttpException(
          { message: 'confirm_password Not Correct!', status: false },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (comparePassword(updateUserDto.password, user.password)) {
        throw new HttpException(
          { message: 'New Password Can Not Same Old Password!', status: false },
          HttpStatus.BAD_REQUEST,
        );
      }

      const password = bcryptPassword(updateUserDto.password);
      updateUserDto = { ...updateUserDto, password };
    }

    if (updateUserDto.fullname) user.fullname = updateUserDto.fullname;
    if (updateUserDto.email_or_phone)
      user.email_or_phone = updateUserDto.email_or_phone;
    if (updateUserDto.password) user.password = updateUserDto.password;
    user.updated_at = new Date();
    await user.save();
    return userConverter(user);
  }
}
