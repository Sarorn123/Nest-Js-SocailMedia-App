import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './User/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/key';

@Module({
  imports: [
    MongooseModule.forRoot(config.DB_URL),
    UserModule,
    AuthModule,
    // import all module to app module
  ],
})
export class AppModule {}
