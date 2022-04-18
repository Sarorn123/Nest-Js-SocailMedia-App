import { AddCommentDto, EditCommentDto } from './Dto/Comment.dto';
import { CommentService } from './comment.service';
import { User } from '../../User/user.interface';
export default class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    addComment(addCommentDto: AddCommentDto, user: User): Promise<import("./comment.interface").Comment>;
    editComment(id: string, editPostDto: EditCommentDto, user: User): Promise<import("./comment.interface").Comment | {
        message: string;
        status: boolean;
        error: any;
    }>;
    deleteComment(id: string, user: User): Promise<object | {
        message: string;
        status: boolean;
        error: any;
    }>;
    actionLikeComment(id: string, user: User): Promise<object | {
        message: string;
        status: boolean;
        error: any;
    }>;
    getAllLikeByCommentId(id: string, user: User): Promise<object | {
        message: string;
        status: boolean;
        error: any;
    }>;
}
