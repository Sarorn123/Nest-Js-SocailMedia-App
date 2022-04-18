import { Story } from '../story.interface';
import { User } from '../../User/user.interface';
export declare function UserStoryConverter(user: User, viewed: boolean): {
    id: string;
    fullname: string;
    profile_picture: string;
    viewed: boolean;
};
export declare function StoryConverter(story: Story): {
    id: string;
    userId: User;
    image_url: string;
    likes: number;
    viewers: number;
    created_at: string;
};
