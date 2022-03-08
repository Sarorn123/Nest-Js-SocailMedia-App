import { UserService } from '../user.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { User } from '../../../dist/User/user.interface';
import { userConverter } from '../Convert/user.convert';

@Injectable()
export class FollowService extends UserService {
  async actionFollowing(
    follower_id: string,
    following_id: string,
  ): Promise<any> {
    // follower_id is id that following user will follow to

    if (!mongoose.Types.ObjectId.isValid(follower_id)) {
      throw new HttpException(
        { message: 'Follower User Not Found!', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!mongoose.Types.ObjectId.isValid(following_id)) {
      throw new HttpException(
        { message: 'Following User Not Found!', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (follower_id === following_id) {
      throw new HttpException(
        { message: 'You Can Not Follow Yourself!', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }
    const follower = await this.userModel.findOne({ _id: follower_id });
    const following = await this.userModel.findOne({ _id: following_id });

    const existed = follower.followers.indexOf(following_id) > -1;
    if (!existed) {
      follower.followers.push(following_id); //add to array
      follower.save();

      following.followings.push(follower_id);
      following.save();

      return {
        message: 'Followed',
        status: true,
      };
    } else {
      follower.followers.splice(follower.followers.indexOf(following_id), 1); //delete from array
      follower.save();

      following.followings.splice(following.followings.indexOf(follower_id, 1));
      following.save();

      return {
        message: 'UnFollowed',
        status: true,
      };
    }
  }

  async getAllUserFollowing(id: string, user: User): Promise<object> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException(
        { message: 'User Not Found!', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user_loggedIn_data = await this.userModel.findById(user.id);
    const user_data = await this.userModel.findById(id);
    const user_following_array = [];

    await Promise.all(
      user_data.followings.map(async (userId) => {
        const user_following = await this.userModel.findById(userId);
        if (user_following) {
          const followed = user_loggedIn_data.followings.indexOf(userId) > -1;
          const user_convert = userConverter(user_following, followed);
          user_following_array.push(user_convert);
        }
      }),
    );

    return user_following_array;
  }

  async getAllUserFollower(id: string, user: User): Promise<object> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException(
        { message: 'User Not Found!', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user_loggedIn_data = await this.userModel.findById(user.id);
    const user_data = await this.userModel.findById(id);
    const user_following_array = [];

    await Promise.all(
      user_data.followers.map(async (userId) => {
        const user_follower = await this.userModel.findById(userId);
        if (user_follower) {
          const followed = user_loggedIn_data.followings.indexOf(userId) > -1;
          const user_convert = userConverter(user_follower, followed);
          user_following_array.push(user_convert);
        }
      }),
    );

    return user_following_array;
  }
}
