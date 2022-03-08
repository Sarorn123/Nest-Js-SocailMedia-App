import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { FollowService } from './Follow/follow.service';
import { ActionFollowDto } from './Follow/Dto/follow.dto';
import { getUserLoggedIn } from '../Decorator/user.decorator';
import { User } from '../../dist/User/user.interface';

@Controller('/user')
export default class UserController {
  constructor(private readonly followService: FollowService) {}

  @Post('follow')
  @UsePipes(ValidationPipe)
  actionFollowing(@Body() followDto: ActionFollowDto) {
    return this.followService.actionFollowing(
      followDto.follower_id,
      followDto.following_id,
    );
  }

  @Get('/getAllUserFollowing/:id')
  getAllUserFollowing(@Param('id') id, @getUserLoggedIn() user: User) {
    return this.followService.getAllUserFollowing(id, user);
  }

  @Get('/getAllUserFollower/:id')
  getAllUserFollower(@Param('id') id, @getUserLoggedIn() user: User) {
    return this.followService.getAllUserFollowing(id, user);
  }
}
