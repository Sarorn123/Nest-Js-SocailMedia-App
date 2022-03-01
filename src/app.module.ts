import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './User/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from './auth/route.protection';
import { APP_GUARD } from '@nestjs/core';
import { PostModule } from './Post/post.module';
import { CommentModule } from './Post/Comment/comment.module';
import { keys } from 'Keys/keys';

@Module({
  imports: [
    MongooseModule.forRoot(keys.DB_URI),
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
    // import all module to app module
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
