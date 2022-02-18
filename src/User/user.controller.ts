import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  Put,
  Param,
} from '@nestjs/common';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { FollowService } from './Follow/follow.service';
import { ActionFollowDto } from './Follow/Dto/follow.dto';

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
}
