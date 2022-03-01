import { AddCommentDto } from './Dto/Comment.dto';
import { CommentService } from './comment.service';
import { User } from '../../User/user.interface';
export default class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    addComment(addCommentDto: AddCommentDto, user: User): Promise<import("./comment.interface").Comment>;
}
