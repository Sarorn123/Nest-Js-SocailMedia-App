import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './User/users.module';
import { UserInformationModule } from './UserInfomation/user.information.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest-js-social-media-api',
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
    UserInformationModule,
    // import all module to app module
  ],
})
export class AppModule {}
