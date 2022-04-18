import { User } from 'src/User/user.interface';
export interface Post {
    id?: string;
    caption: string;
    image_or_video: string[];
    post_status: string;
    tages: string[];
    likes: string[];
    created_at: Date;
    updated_at: Date;
    userId: User;
}
