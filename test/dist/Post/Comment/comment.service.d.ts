import { Model } from 'mongoose';
import { Comment } from './comment.interface';
import { AddCommentDto } from './Dto/Comment.dto';
import { PostService } from '../post.service';
export declare class CommentService {
    protected commentModel: Model<Comment>;
    private readonly postService;
    constructor(commentModel: Model<Comment>, postService: PostService);
    addComment(addCommentDto: AddCommentDto): Promise<Comment>;
    getAllCommentsByPost(id: string): Promise<any>;
}
