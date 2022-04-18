import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { getUserLoggedIn } from '../Decorator/user.decorator';
import { User } from '../User/user.interface';
import { StoryService } from './story.service';
import { AddStoryDto } from './Dto/Story.dto';
import { Story } from './story.interface';

@Controller('/story')
export default class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Get('getAllStory')
  async getAllStory(@getUserLoggedIn() user: User): Promise<any> {
    return this.storyService.getAllStory(user).catch((error) => {
      return {
        message: error.message,
        status: false,
      };
    });
  }
  @Get('getStory/:id')
  async getStory(
    @getUserLoggedIn() user: User,
    @Param('id') id: string,
  ): Promise<any> {
    return this.storyService.getStory(id, user).catch((error) => {
      return {
        message: error.message,
        status: false,
      };
    });
  }

  @Get('actionViewStory/:id')
  async actionViewStory(
    @getUserLoggedIn() user: User,
    @Param('id') id: string,
  ): Promise<any> {
    return this.storyService.actionViewStory(id, user);
  }

  @Get('actionLikeStory/:id')
  async actionLikeStory(
    @getUserLoggedIn() user: User,
    @Param('id') id: string,
  ): Promise<any> {
    return this.storyService.actionLikeStory(id, user);
  }

  @Get('getAllStoryViewer/:id')
  async getAllStoryViewer(
    @getUserLoggedIn() user: User,
    @Param('id') id: string,
  ): Promise<any> {
    return this.storyService.getAllStoryViewer(id, user);
  }
}
