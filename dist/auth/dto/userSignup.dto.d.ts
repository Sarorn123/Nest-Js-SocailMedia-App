export declare class UserSignupDto {
    fullname: string;
    gender: number;
    email_or_phone: string;
    password: string;
    confirm_password: string;
}
export declare class UpdateUserDto {
    fullname: string;
    email_or_phone: string;
    password: string;
    confirm_password: string;
    profile_picture: string;
    cover_picture: string;
    photos_or_videos: [string];
}
