export interface User {
    id?: string;
    fullname: string;
    gender: number;
    email_or_phone: string;
    password: string;
    profile_picture: string;
    profile_picture_name: string;
    cover_picture: string;
    posts: Object[];
    followers: string[];
    followings: string[];
    role: string;
    created_at: Date;
    updated_at: Date;
}
