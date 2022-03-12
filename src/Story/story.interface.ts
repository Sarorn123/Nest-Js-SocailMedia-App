import { User } from '../User/user.interface';

export interface Story {
  id?: string;
  image_url: string;
  likes: string[];
  already_views: string[];
  created_at: Date;
  userId: User;
}
