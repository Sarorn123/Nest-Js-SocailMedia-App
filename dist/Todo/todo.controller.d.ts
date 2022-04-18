import { User } from '../User/user.interface';
import { Todo } from './todo.interface';
import { TodoService } from './todo.service';
import { AddTodoDto } from './Dto/todo.dto';
export default class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    getAllTodoCategory(user: User): Promise<Todo[]>;
    getTodo(user: User, id: string): Promise<any>;
    addTodo(user: User, addTodoDto: AddTodoDto): Promise<any>;
    updateTodo(user: User, addTodoDto: AddTodoDto, id: string): Promise<any>;
    deleteTodo(id: string): Promise<any>;
}
