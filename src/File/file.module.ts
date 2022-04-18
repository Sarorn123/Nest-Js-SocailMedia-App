import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../User/user.module';
import FileController from './file.controller';
import { UserService } from '../User/user.service';
import { StoryModule } from '../Story/story.module';

@Module({
  imports: [UserModule, StoryModule],
  controllers: [FileController],
  providers: [],
})
export class FileModule {}
