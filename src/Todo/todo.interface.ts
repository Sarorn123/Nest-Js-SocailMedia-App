import { User } from '../User/user.interface';

export interface Todo {
  id?: string;
  title: string;
  description: string;
  parentId: string;
  doned: Boolean;
  created_at: Date;
  userId: User;
}
