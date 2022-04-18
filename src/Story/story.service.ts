import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Story } from './story.interface';
import { User } from '../User/user.interface';
import { AddStoryDto } from './Dto/Story.dto';
import { UserService } from '../User/user.service';
import { StoryConverter, UserStoryConverter } from './Convert/story.convert';
import { userConverter } from '../User/Convert/user.convert';

@Injectable()
export class StoryService {
  constructor(
    @InjectModel('Story')
    protected storyModel: Model<Story>,
    private userService: UserService,
  ) {}

  async getAllStory(user: User): Promise<object[]> {
    // get all my story in 24h
    const my_story: Story[] = await this.storyModel.find({
      userId: user.id,
      created_at: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });
    const user_loggedIn_data = await this.userService.getUserById(user.id);
    const user_story_valid = [];

    await Promise.all(
      user_loggedIn_data.followings.map(async (friId) => {
        // get all fri story in 24h
        const fri_story: Story[] = await this.storyModel.find({
          userId: friId,
          created_at: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        });

        if (fri_story.length !== 0) {
          const user_data = await this.userService.getUserById(friId);
          let viewed = false;
          fri_story.map((story_object) => {
            const existed = story_object.viewers.indexOf(user.id) > -1;
            if (existed) {
              viewed = true;
              return;
            }
          });
          user_story_valid.push(UserStoryConverter(user_data, viewed));
        }
      }),
    );

    if (my_story.length !== 0) {
      let viewed = false;
      my_story.map((story_object) => {
        const existed = story_object.viewers.indexOf(user.id) > -1;
        if (existed) {
          viewed = true;
          return;
        }
      });
      const my_data = [UserStoryConverter(user_loggedIn_data, viewed)];
      return my_data.concat(user_story_valid);
    }

    return user_story_valid;
  }

  async getStory(id: string, user: User): Promise<any[]> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException({ message: 'User Not Found!' });
    }
    const story_array: Story[] = await this.storyModel.find({
      userId: id,
      created_at: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });

    const result = [];
    story_array.map((story) => {
      result.push(StoryConverter(story));
    });
    return result;
  }

  async addStory(
    user: User,
    image_url: string,
    image_name: string,
  ): Promise<Story> {
    const storyDto = {
      userId: user.id,
      image_url: image_url,
      image_name: image_name,
    };
    return await this.storyModel.create(storyDto);
  }
  async actionViewStory(id: string, user: User): Promise<any> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException({
        message: 'Story Not Found!',
        status: false,
      });
    }
    const story = await this.storyModel.findById(id).populate('userId');
    if (story.userId.id === user.id) {
      return { message: 'viewed', status: true };
    }

    const existed = story.viewers.indexOf(user.id) > -1;
    if (existed) {
      return { message: 'viewed', status: true };
    }

    story.viewers.push(user.id);
    story.save();
    return { message: 'viewed', status: true };
  }
  async deleteStory(id: string, user: User): Promise<any> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException({ message: 'Story Not Found!' });
    }

    const story = await this.storyModel.findById(id).populate('userId');
    if (user.id !== story.userId.id) {
      throw new BadRequestException({
        message: 'You Can Only Delete Your Story!',
      });
    }
    return await this.storyModel.remove(story);
  }
  async actionLikeStory(id: string, user: User): Promise<any> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException({
        message: 'Story Not Found!',
        status: false,
      });
    }
    const story = await this.storyModel.findById(id).populate('userId');
    if (story.userId.id === user.id) {
      return { message: 'Liked', status: true };
    }

    const liked = story.likes.indexOf(user.id) > -1;
    if (liked) {
      story.likes.splice(story.likes.indexOf(user.id, 1)); //delete from array
      await story.save();
      return {
        message: 'Unliked',
        status: true,
      };
    }

    story.likes.push(user.id);
    story.save();
    return { message: 'Liked', status: true };
  }
  async getAllStoryViewer(id: string, user: User): Promise<any[]> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException({
        message: 'Story Not Found!',
        status: false,
      });
    }
    const story = await this.storyModel.findById(id).populate('userId');
    if (story.userId.id !== user.id) {
      throw new BadRequestException({
        message: 'You Can Only See Viewer On Your Story!',
        status: false,
      });
    }
    const user_loggedIn = await this.userService.getUserById(user.id);

    const users = [];
    await Promise.all(
      story.viewers.map(async (userId: string) => {
        const user: User = await this.userService.getUserById(userId);
        if (user) {
          const followed = user_loggedIn.followings.indexOf(userId) > -1;
          users.push(userConverter(user, followed));
        }
      }),
    );

    return users;
  }

  async getStoryById(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException({
        message: 'Story Not Found!',
        status: false,
      });
    }
    return await this.storyModel.findById(id);
  }
}
