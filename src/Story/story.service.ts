import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Story } from './story.interface';
import { User } from '../User/user.interface';
import { AddStoryDto } from './Dto/Story.dto';
import { UserService } from '../User/user.service';
import { async } from 'rxjs';
import { UserStoryConverter } from './Convert/story.convert';

@Injectable()
export class StoryService {
  constructor(
    @InjectModel('Story')
    protected storyModel: Model<Story>,
    private userService: UserService,
  ) {}

  async getAllStory(user: User): Promise<any> {
    const my_story: Story[] = await this.storyModel.find({
      userId: user.id,
      created_at: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });
    const user_loggedIn_data = await this.userService.getUserById(user.id);

    const following_people = user_loggedIn_data.followings;

    const user_story_valid = [];

    await Promise.all(
      following_people.map(async (friId) => {
        const fri_story: Story[] = await this.storyModel.find({
          userId: friId,
          created_at: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        });

        if (fri_story.length !== 0) {
          const user_data = await this.userService.getUserById(friId);
          let viewed: boolean = false;
          fri_story.map((story_object) => {
            const existed = story_object.already_views.indexOf(user.id) > -1;
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
        const existed = story_object.already_views.indexOf(user.id) > -1;
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

  async getStory(user: User): Promise<any> {
    const my_story: object[] = await this.storyModel.find({
      userId: user.id,
      created_at: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });

    return my_story;
  }

  async addStory(user: User, addStoryDto: AddStoryDto): Promise<any> {
    const userId = user.id;
    addStoryDto = { ...addStoryDto, userId };
    return await this.storyModel.create(addStoryDto);
  }
}
