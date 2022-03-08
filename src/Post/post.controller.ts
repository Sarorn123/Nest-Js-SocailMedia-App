import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { AddPostDto, DeletePostDto, EditPostDto } from './Dto/post.dto';
import { getUserLoggedIn } from '../Decorator/user.decorator';
import { User } from '../User/user.interface';

@Controller('/post')
export default class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('addPost')
  @UsePipes(ValidationPipe)
  addPost(@Body() addPostDto: AddPostDto) {
    return this.postService.addPost(addPostDto);
  }

  @Post('editPost/:id')
  editPost(
    @Param('id') id,
    @getUserLoggedIn() user: User,
    @Body() editPostDto: EditPostDto,
  ) {
    return this.postService.editPost(id, editPostDto, user.id);
  }

  @Get('/getPost/:id')
  getPost(@Param('id') id) {
    return this.postService.getPost(id);
  }

  @Get('/getAllPostsByUserId/:id')
  getAllPostsByUserId(@Param('id') id: string) {
    return this.postService.getAllPostsByUserId(id);
  }

  @Post('/deletePost')
  @UsePipes(ValidationPipe)
  deletePost(
    @Body() deletePostDto: DeletePostDto,
    @getUserLoggedIn() user: User,
  ) {
    return this.postService
      .deletePost(deletePostDto.postId, deletePostDto.userId, user)
      .catch((err) => {
        return {
          message: 'Post Not Found!',
          status: false,
          error: err.message,
        };
      });
  }

  @Post('/actionLikePost/:id')
  likePost(@Param('id') id, @getUserLoggedIn() user: User) {
    return this.postService.actionLikePost(id, user.id);
  }

  @Get('/getAllLikeByPostId/:id')
  getAllLikeByPostId(@Param('id') id, @getUserLoggedIn() user: User) {
    return this.postService.getAllLikeByPostId(id, user);
  }
}
