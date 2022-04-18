import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { getUserLoggedIn } from '../Decorator/user.decorator';
import { User } from '../User/user.interface';
import { Todo } from './todo.interface';
import { TodoService } from './todo.service';

@Controller('/todo')
export default class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // @Get('getAllStory')
  // async getAllStory(@getUserLoggedIn() user: User): Promise<any> {
  //   return this.storyService.getAllStory(user).catch((error) => {
  //     return {
  //       message: error.message,
  //       status: false,
  //     };
  //   });
  // }
  @Get('getAllTodoCategories')
  async getAllTodoCategory(@getUserLoggedIn() user: User): Promise<Todo[]> {
    return this.todoService.getAllTodoCategory(user);
  }
}
