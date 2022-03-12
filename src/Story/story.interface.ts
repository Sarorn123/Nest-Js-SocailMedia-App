import { User } from '../User/user.interface';

export interface Story {
  id?: string;
  image_url: string;
  likes: string[];
  viewers: string[];
  created_at: Date;
  userId: User;
}
