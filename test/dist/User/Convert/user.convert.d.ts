import { User } from '../user.interface';
export declare function userConverter(user: User): {
    id: string;
    fullname: string;
    email_or_phone: string;
    followers: String[];
    followings: String[];
    profile_picture: string;
    cover_picture: string;
    created_at: Date;
    updated_at: Date;
};
