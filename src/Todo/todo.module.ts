import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Global } from '@nestjs/common';
import { UserModule } from '../User/user.module';
import TodoController from './todo.controller';
import { TodoService } from './todo.service';
import { TodoSchema } from './todo.scema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]),
    UserModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
