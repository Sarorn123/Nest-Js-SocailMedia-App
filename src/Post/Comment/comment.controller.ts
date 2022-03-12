import {
  Body,
  Controller,
  Post,
  Param,
  Put,
  Delete,
  Get,
} from '@nestjs/common';
import { AddCommentDto, EditCommentDto } from './Dto/Comment.dto';
import { CommentService } from './comment.service';
import { User } from '../../User/user.interface';
import { getUserLoggedIn } from '../../Decorator/user.decorator';

@Controller('/comment')
export default class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('addComment')
  addComment(
    @Body() addCommentDto: AddCommentDto,
    @getUserLoggedIn() user: User,
  ) {
    const userId = user.id;
    addCommentDto = { ...addCommentDto, userId };
    return this.commentService.addComment(addCommentDto);
  }

  @Put('editComment/:id')
  async editComment(
    @Param('id') id: string,
    @Body() editPostDto: EditCommentDto,
    @getUserLoggedIn() user: User,
  ) {
    return this.commentService
      .editComment(id, editPostDto, user)
      .catch((error) => {
        return {
          message: 'Comment Not Found!',
          status: false,
          error: error.message,
        };
      });
  }

  @Delete('/deleteComment/:id')
  async deleteComment(@Param('id') id: string, @getUserLoggedIn() user: User) {
    return this.commentService.deleteComment(id, user).catch((error) => {
      return {
        message: 'Comment Not Found!',
        status: false,
        error: error.message,
      };
    });
  }

  @Get('/actionLikeComment/:id')
  async actionLikeComment(
    @Param('id') id: string,
    @getUserLoggedIn() user: User,
  ) {
    return this.commentService.actionLikeComment(id, user.id).catch((error) => {
      return {
        message: 'Comment Not Found!',
        status: false,
        error: error.message,
      };
    });
  }
  @Get('/getAllLikeByCommentId/:id')
  async getAllLikeByCommentId(
    @Param('id') id: string,
    @getUserLoggedIn() user: User,
  ) {
    return this.commentService
      .getAllLikeByCommentId(id, user)
      .catch((error) => {
        return {
          message: 'Comment Not Found!',
          status: false,
          error: error.message,
        };
      });
  }
}
