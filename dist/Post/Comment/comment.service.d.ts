import { Model } from 'mongoose';
import { Comment } from './comment.interface';
import { AddCommentDto, EditCommentDto } from './Dto/Comment.dto';
import { PostService } from '../post.service';
import { User } from '../../User/user.interface';
import { UserService } from '../../User/user.service';
export declare class CommentService {
    protected commentModel: Model<Comment>;
    private readonly postService;
    private readonly userService;
    constructor(commentModel: Model<Comment>, postService: PostService, userService: UserService);
    addComment(addCommentDto: AddCommentDto): Promise<Comment>;
    getAllCommentsByPost(postId: string): Promise<any>;
    editComment(id: string, editCommentDto: EditCommentDto, user: User): Promise<Comment>;
    deleteComment(id: string, user: User): Promise<object>;
    actionLikeComment(id: string, userId: string): Promise<object>;
    getAllLikeByCommentId(id: string, user: User): Promise<object>;
}
