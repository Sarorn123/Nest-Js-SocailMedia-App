import { PostService } from './post.service';
import { AddPostDto, DeletePostDto, EditPostDto } from './Dto/post.dto';
import { User } from '../User/user.interface';
export default class PostController {
    private readonly postService;
    constructor(postService: PostService);
    addPost(addPostDto: AddPostDto): Promise<import("./post.interface").Post>;
    editPost(id: string, user: User, editPostDto: EditPostDto): Promise<any>;
    getPost(id: string): Promise<any>;
    getAllPostsByUserId(id: string): Promise<import("./post.interface").Post[]>;
    deletePost(deletePostDto: DeletePostDto, user: User): Promise<any>;
    likePost(id: string, user: User): Promise<any>;
    getAllLikeByPostId(id: string, user: User): Promise<object>;
}
