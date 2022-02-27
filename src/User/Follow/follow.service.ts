import { UserService } from '../user.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';

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
}
