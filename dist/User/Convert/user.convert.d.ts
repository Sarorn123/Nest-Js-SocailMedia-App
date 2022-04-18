import { User } from '../user.interface';
export declare function userConverter(user: User, followed?: boolean): {
    id: string;
    fullname: string;
    email_or_phone: string;
    followers: number;
    followings: number;
    profile_picture: string;
    created_at: Date;
    updated_at: Date;
    followed: boolean;
};
