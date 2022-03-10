import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../User/user.module';
import FileController from './file.controller';
import { UserService } from '../User/user.service';

@Module({
  imports: [UserModule],
  controllers: [FileController],
  providers: [],
})
export class FileModule {}
