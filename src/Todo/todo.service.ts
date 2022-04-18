import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Todo } from './todo.interface';
import { User } from '../User/user.interface';
import { UserService } from '../User/user.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('Todo')
    protected todoModel: Model<Todo>,
    private userService: UserService,
  ) {}

  // async getStory(id: string, user: User): Promise<any[]> {
  //   if (!mongoose.Types.ObjectId.isValid(id)) {
  //     throw new BadRequestException({ message: 'User Not Found!' });
  //   }
  //   const story_array: Story[] = await this.storyModel.find({
  //     userId: id,
  //     created_at: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  //   });

  //   const result = [];
  //   story_array.map((story) => {
  //     result.push(StoryConverter(story));
  //   });
  //   return result;
  // }

  async getAllTodoCategory(user: User): Promise<Todo[]> {
    return await this.todoModel.find({ userId: user.id });
  }
}
