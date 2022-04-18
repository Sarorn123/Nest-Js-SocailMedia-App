import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Global } from '@nestjs/common';
import { StorySchema } from './story.scema';
import StoryController from './story.controller';
import { StoryService } from './story.service';
import { UserModule } from '../User/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Story', schema: StorySchema }]),
    UserModule,
  ],
  controllers: [StoryController],
  providers: [StoryService],
  exports: [StoryService],
})
export class StoryModule {}
