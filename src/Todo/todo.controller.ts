import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { getUserLoggedIn } from '../Decorator/user.decorator';
import { User } from '../User/user.interface';
import { Todo } from './todo.interface';
import { TodoService } from './todo.service';
import { AddTodoDto } from './Dto/todo.dto';

@Controller('/todo')
export default class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get('getAllTodoCategories')
  async getAllTodoCategory(@getUserLoggedIn() user: User): Promise<Todo[]> {
    return this.todoService.getAllTodoCategory(user);
  }

  @Get('getTodo/:id')
  async getTodo(
    @getUserLoggedIn() user: User,
    @Param('id') id: string,
  ): Promise<any> {
    return this.todoService.getCategory(user, id);
  }

  @Post('addTodo')
  async addTodo(
    @getUserLoggedIn() user: User,
    @Body() addTodoDto: AddTodoDto,
  ): Promise<any> {
    return this.todoService.addTodo(user, addTodoDto);
  }

  @Put('updateTodo/:id')
  async updateTodo(
    @getUserLoggedIn() user: User,
    @Body() addTodoDto: AddTodoDto,
    @Param('id') id: string,
  ): Promise<any> {
    return this.todoService.updateTodo(user, addTodoDto, id);
  }

  @Delete('deleteTodo/:id')
  async deleteTodo(@Param('id') id: string): Promise<any> {
    return this.todoService.deleteTodo(id);
  }
}
