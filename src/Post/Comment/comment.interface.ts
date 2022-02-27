import { User } from 'src/User/user.interface';

export interface Comment {
  id?: string;
  body: string;
  likes: string[];
  created_at: Date;
  updated_at: Date;
  userId: User;
}
