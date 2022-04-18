import { UserSignupDto, UpdateUserDto } from '../auth/dto/userSignup.dto';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { UserLoginDto } from '../auth/dto/userLogin.dto';
import { Post } from '../Post/post.interface';
export declare class UserService {
    protected userModel: Model<User>;
    constructor(userModel: Model<User>);
    addUser(userSignupDto: UserSignupDto): Promise<any>;
    editUser(id: string, updateUserDto: UpdateUserDto): Promise<any>;
    LoginUser(userLoginDto: UserLoginDto): Promise<User>;
    addPostToUser(id: string, post: Post): Promise<any>;
    removePostFromUser(id: string, post_id: string, post: Object): Promise<any>;
    getAllPostsByUserId(id: string): Promise<any[]>;
    getUserById(id: string): Promise<User>;
    updateProfilePicture(id: string, image_url: string, file_path: string, new_file_name: string): Promise<object>;
}
