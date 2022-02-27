import { Body, Controller, Post, Req } from '@nestjs/common';
import { AddCommentDto } from './Dto/Comment.dto';
import { CommentService } from './comment.service';
import { User } from '../../User/user.interface';
import { getUserLoggedIn } from '../../Decorator/user.decorator';
import { Request } from 'express';

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

  // @Post('editPost/:id')
  // editPost(@Param('id') id, @Body() addPostDto: AddPostDto) {
  //   return this.postService.editPost(id, addPostDto);
  // }

  // @Get('/getComment/:id')
  // getPost(@Param('id') id) {
  //   return this.commentService.getComment(id);
  // }

  // @Get('/getAllPostsByUserId/:id')
  // getAllPostsByUserId(@Param('id') id: string) {
  //   return this.postService.getAllPostsByUserId(id);
  // }

  // @Post('/deletePost')
  // @UsePipes(ValidationPipe)
  // deletePost(@Body() deletePostDto: DeletePostDto) {
  //   return this.postService.deletePost(
  //     deletePostDto.postId,
  //     deletePostDto.userId,
  //   );
  // }
}
