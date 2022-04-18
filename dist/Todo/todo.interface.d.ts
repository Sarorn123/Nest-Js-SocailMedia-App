import { User } from '../User/user.interface';
export interface Todo {
    id?: string;
    title: string;
    description: string;
    parentId: string;
    created_at: Date;
    userId: User;
}
