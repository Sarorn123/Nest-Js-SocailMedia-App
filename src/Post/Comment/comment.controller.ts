import { Body, Controller, Post, Param, Put, Delete } from '@nestjs/common';
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
    return this.commentService.addComment(addCommentDto);
  }

  @Put('editComment/:id')
  editPost(
    @Param('id') id,
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
  deletePost(@Param('id') id, @getUserLoggedIn() user: User) {
    return this.commentService.deleteComment(id, user).catch((error) => {
      return {
        message: 'Comment Not Found!',
        status: false,
        error: error.message,
      };
    });
  }
}
