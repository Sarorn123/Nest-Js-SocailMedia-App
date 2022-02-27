import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserSignupDto, UpdateUserDto } from '../auth/dto/userSignup.dto';
import { bcryptPassword, comparePassword } from '../Hash/Bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { userConverter } from './Convert/user.convert';
import { UserLoginDto } from '../auth/dto/userLogin.dto';
import { UnauthorizedException } from '@nestjs/common';
import { Post } from '../Post/post.interface';
import * as mongoose from 'mongoose';
import { postConverter } from '../Post/Convert/post.convert';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    protected userModel: Model<User>,
  ) {}

  async addUser(userSignupDto: UserSignupDto): Promise<any> {
    ///check fullname
    const fullname_existed = await this.userModel.findOne({
      fullname: userSignupDto.fullname,
    });
    if (fullname_existed) {
      throw new HttpException(
        { message: 'Fullname Already Exist!', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }

    /// check email phone
    const email_or_phone_exited = await this.userModel.findOne({
      email_or_phone: userSignupDto.email_or_phone,
    });
    if (email_or_phone_exited) {
      throw new HttpException(
        { message: 'Email Or Phone Already Exist!', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }

    const password = bcryptPassword(userSignupDto.password);
    userSignupDto = { ...userSignupDto, password };
    const user = await this.userModel.create(userSignupDto);
    return userConverter(user);
  }

  async editUser(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException(
        { message: 'User Not Found!', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }

    /// check fullname
    const fullname_existed = await this.userModel
      .findOne({
        fullname: updateUserDto.fullname,
      })
      .where('_id')
      .ne(id);

    if (fullname_existed) {
      throw new HttpException(
        { message: 'Email Or Phone Already Exist!', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }

    /// check email phone
    const email_or_phone_exited = await this.userModel
      .findOne({
        email_or_phone: updateUserDto.email_or_phone,
      })
      .where('_id')
      .ne(id);

    if (email_or_phone_exited) {
      throw new HttpException(
        { message: 'Email Or Phone Already Exist!', status: false },
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

  async LoginUser(userLoginDto: UserLoginDto): Promise<User> {
    const user = await this.userModel
      .findOne({
        email_or_phone: userLoginDto.email_or_phone,
      })
      .populate('posts');
    return user;
  }

  async addPostToUser(id: string, post: Post): Promise<any> {
    const user = await this.userModel.findById(id);
    user.posts.push(post);
    return await user.save();
  }
  async removePostFromUser(
    id: string,
    post_id: string,
    post: Object,
  ): Promise<any> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException(
        { message: 'User Not Found!', satus: false },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userModel.findById(id);
    user.posts.splice(user.posts.indexOf(post_id), 1); //delete from array
    await user.save();
    return post;
  }

  async getAllPostsByUserId(id: string): Promise<any[]> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException(
        { message: 'User Not Found!', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userModel.findById(id).populate('posts');
    return user.posts.map((post) => postConverter(post));
  }
}
