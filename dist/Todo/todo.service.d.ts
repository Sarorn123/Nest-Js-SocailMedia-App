import { Model } from 'mongoose';
import { Todo } from './todo.interface';
import { User } from '../User/user.interface';
import { UserService } from '../User/user.service';
import { AddTodoDto } from './Dto/todo.dto';
export declare class TodoService {
    protected todoModel: Model<Todo>;
    private userService;
    constructor(todoModel: Model<Todo>, userService: UserService);
    getAllTodoCategory(user: User): Promise<Todo[]>;
    getCategory(user: User, id: string): Promise<any>;
    addTodo(user: User, addTodoDto: AddTodoDto): Promise<Todo>;
    updateTodo(user: User, addTodoDto: AddTodoDto, id: string): Promise<Todo>;
    deleteTodo(id: string): Promise<Todo>;
}
