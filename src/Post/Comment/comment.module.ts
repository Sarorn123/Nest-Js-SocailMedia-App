import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from '../post.module';
import { CommentSchema } from './comment.scema';
import CommentController from './comment.controller';
import { CommentService } from './comment.service';
import { Global } from '@nestjs/common';
import { UserModule } from '../../User/user.module';

@Global()
@Module({
  imports: [
    PostModule,
    UserModule,
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
