import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Todo } from './todo.interface';
import { User } from '../User/user.interface';
import { UserService } from '../User/user.service';
import { AddTodoDto } from './Dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('Todo')
    protected todoModel: Model<Todo>,
    private userService: UserService,
  ) {}

  async getAllTodoCategory(user: User): Promise<Todo[]> {
    const categories = await this.todoModel.find({
      userId: user.id,
      parentId: null,
      oder: {
        created_at: 'DESC',
      },
    });

    const all = [];
    if (categories.length !== 0) {
      await Promise.all(
        categories.map(async (category) => {
          const category_child = await this.todoModel.find({
            parentId: category.id,
          });
          const data = {
            id: category.id,
            title: category.title,
            description: category.description,
            doned: category.doned,
            created_at: category.created_at,
            children: category_child,
          };
          return all.push(data);
        }),
      );
    }
    return all;
  }
  async getCategory(user: User, id: string): Promise<any> {
    const todo = await this.todoModel.findById(id);
    const todo_child = await this.todoModel.find({ parentId: todo.id });
    const data = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      created_at: todo.created_at,
      children: todo_child,
    };
    return data;
  }

  async addTodo(user: User, addTodoDto: AddTodoDto): Promise<Todo> {
    const userId = user.id;
    addTodoDto = { ...addTodoDto, userId };
    const new_todo = await this.todoModel.create(addTodoDto);
    return new_todo;
  }

  async updateTodo(
    user: User,
    addTodoDto: AddTodoDto,
    id: string,
  ): Promise<Todo> {
    const todo_id = await (
      await this.todoModel.findByIdAndUpdate(id, addTodoDto)
    ).id;
    return await this.todoModel.findById(todo_id);
  }

  async deleteTodo(id: string): Promise<Todo> {
    const todo_child = await this.todoModel.find({ parentId: id });
    if (todo_child.length !== 0) {
      Promise.all(
        todo_child.map(async (child) => {
          await this.todoModel.findByIdAndDelete(child.id);
        }),
      );
    }
    return await this.todoModel.findByIdAndRemove(id);
  }
}
