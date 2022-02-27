import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Comment } from './comment.interface';
import { AddCommentDto } from './Dto/Comment.dto';
import { PostService } from '../post.service';
import { CommentConverter } from './Convert/comment.convert';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment')
    protected commentModel: Model<Comment>,
    @Inject(forwardRef(() => CommentService))
    private readonly postService: PostService,
  ) {}

  async addComment(addCommentDto: AddCommentDto): Promise<Comment> {
    if (!addCommentDto.is_reply_to) {
      if (!mongoose.Types.ObjectId.isValid(addCommentDto.userId)) {
        throw new HttpException(
          { message: 'User Not Found!', status: false },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!mongoose.Types.ObjectId.isValid(addCommentDto.postId)) {
        throw new HttpException(
          { message: 'Post Not Found!', status: false },
          HttpStatus.BAD_REQUEST,
        );
      }
      const new_comment = await this.commentModel.create(addCommentDto);
      this.postService.addCommentToPost(addCommentDto.postId, new_comment);
      return new_comment;
    } else {
      if (!addCommentDto.parentId) {
        throw new HttpException(
          { message: 'parentId Is Required!', status: false },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!mongoose.Types.ObjectId.isValid(addCommentDto.parentId)) {
        throw new HttpException(
          { message: 'Parent Not Found!', status: false },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!mongoose.Types.ObjectId.isValid(addCommentDto.userId)) {
        throw new HttpException(
          { message: 'User Not Found!', status: false },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!mongoose.Types.ObjectId.isValid(addCommentDto.postId)) {
        throw new HttpException(
          { message: 'Post Not Found!', status: false },
          HttpStatus.BAD_REQUEST,
        );
      }

      const new_comment = await this.commentModel.create(addCommentDto);
      return new_comment;
    }
  }

  async getAllCommentsByPost(id: string): Promise<any> {
    const comments = await this.commentModel
      .find({
        postId: id,
        parentId: null,
      })
      .populate('userId');

    const result = [];
    await Promise.all(
      // use when map with await function //
      comments.map(async (comment) => {
        const children = await this.commentModel
          .find({ parentId: comment.id })
          .populate('userId');

        // convert child //
        const array_children = [];
        children.map((child) => {
          const childObject = CommentConverter(child);
          return array_children.push(childObject);
        });

        // convert parent //
        const comment_data = CommentConverter(comment, array_children);
        result.push(comment_data);
      }),
    );
    return result;
  }
}
