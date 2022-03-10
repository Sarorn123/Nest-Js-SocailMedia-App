import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.interface';
import { AddPostDto, EditPostDto } from './Dto/post.dto';
import { UserService } from '../User/user.service';
import { postConverter } from './Convert/post.convert';
import * as mongoose from 'mongoose';
import { CommentService } from './Comment/comment.service';
import { userConverter } from '../User/Convert/user.convert';
import { User } from '../User/user.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post')
    protected postModel: Model<Post>,
    private readonly userService: UserService,

    @Inject(forwardRef(() => CommentService))
    private commentService: CommentService,
  ) {}

  async addPost(addPostDto: AddPostDto): Promise<Post> {
    if (!mongoose.Types.ObjectId.isValid(addPostDto.userId)) {
      throw new HttpException(
        { message: 'User Not Found!', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }
    const new_post = await this.postModel.create(addPostDto);
    this.userService.addPostToUser(addPostDto.userId, new_post);
    const post = await this.postModel
      .findOne({ _id: new_post._id })
      .populate('userId');
    // return postConverter(post);
    return post;
  }

  async editPost(
    id: string,
    editPostDto: EditPostDto,
    userId: string,
  ): Promise<any> {
    const post = await this.postModel.findById(id).populate('userId');
    if (!post) {
      throw new HttpException(
        { message: 'Post Not Found!', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (userId !== post.userId.id) {
      throw new HttpException(
        { message: 'You Can Update Only Your Post!', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (editPostDto.caption) post.caption = editPostDto.caption;
    if (editPostDto.post_status) post.post_status = editPostDto.post_status;
    if (editPostDto.tages) post.tages = editPostDto.tages;
    if (editPostDto.image_or_video)
      post.image_or_video = editPostDto.image_or_video;
    await post.save();
    return post;
  }

  async getPost(id: string): Promise<any> {
    const post = await this.postModel.findById(id).populate('userId');
    if (!post) {
      throw new HttpException(
        { message: 'Post Not found!', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }

    const comments = await this.commentService.getAllCommentsByPost(id);
    return postConverter(post, comments);
  }

  async getAllPostsByUserId(id: string): Promise<Post[]> {
    return this.userService.getAllPostsByUserId(id);
  }

  async deletePost(postId: string, userId: string, user: User) {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new HttpException(
        { message: 'Post Not Found!', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }
    const post = await this.postModel.findById(postId);
    if (user.id !== userId) {
      throw new HttpException(
        { message: 'You Can Delete Only Your Post!', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }
    await post.remove();
    return this.userService.removePostFromUser(userId, postId, post);
  }

  async actionLikePost(id: string, userId: string): Promise<any> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException(
        { message: 'Post Not Found!', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }

    const post = await this.postModel.findById(id);

    const existed = post.likes.indexOf(userId) > -1;
    if (!existed) {
      post.likes.push(userId);
      await post.save();
      return {
        message: 'liked',
        status: true,
      };
    } else {
      post.likes.splice(post.likes.indexOf(userId), 1); //delete from array
      await post.save();
      return {
        message: 'Unliked',
        status: true,
      };
    }
  }
  async getAllLikeByPostId(id: string, user: User): Promise<object> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException(
        { message: 'Post Not Found!', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }
    const post = await this.postModel.findById(id);
    const user_loggedIn = await this.userService.getUserById(user.id);
    const user_data = [];

    await Promise.all(
      post.likes.map(async (userId) => {
        const user_like = await this.userService.getUserById(userId);
        if (user_like) {
          const followed = user_loggedIn.followings.indexOf(userId) > -1;
          const user_convert = userConverter(user_like, followed);
          user_data.push(user_convert);
        }
      }),
    );
    return user_data;
  }
}
