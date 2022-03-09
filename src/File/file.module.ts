import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import FileController from './file.controller';

@Module({
  imports: [],
  controllers: [FileController],
})
export class FileModule {}
