import { Model } from 'mongoose';
import { Post } from './post.interface';
import { AddPostDto, EditPostDto } from './Dto/post.dto';
import { UserService } from '../User/user.service';
import { Comment } from './Comment/comment.interface';
import { CommentService } from './Comment/comment.service';
export declare class PostService {
    protected postModel: Model<Post>;
    private readonly userService;
    private commentService;
    constructor(postModel: Model<Post>, userService: UserService, commentService: CommentService);
    addPost(addPostDto: AddPostDto): Promise<Post>;
    editPost(id: string, editPostDto: EditPostDto, userId: string): Promise<any>;
    getPost(id: string): Promise<any>;
    getAllPostsByUserId(id: string): Promise<Post[]>;
    deletePost(postId: string, userId: string): Promise<any>;
    addCommentToPost(id: string, comment: Comment): Promise<any>;
}
