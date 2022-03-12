import { Body, Controller, Get, Post } from '@nestjs/common';
import { getUserLoggedIn } from '../Decorator/user.decorator';
import { User } from '../User/user.interface';
import { StoryService } from './story.service';
import { AddStoryDto } from './Dto/Story.dto';

@Controller('/story')
export default class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Get('getAllStory')
  async getStory(@getUserLoggedIn() user: User): Promise<any> {
    return this.storyService.getAllStory(user).catch((error) => {
      return {
        message: error.message,
        status: false,
      };
    });
  }

  @Post('addStory')
  async addStory(
    @getUserLoggedIn() user: User,
    @Body() addStoryDto: AddStoryDto,
  ): Promise<any> {
    return this.storyService.addStory(user, addStoryDto).catch((error) => {
      return {
        message: error.message,
        status: false,
      };
    });
  }
}
