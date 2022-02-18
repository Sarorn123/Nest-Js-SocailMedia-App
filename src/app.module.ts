import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './User/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/key';
import { JwtAuthGuard } from './auth/route.protection';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot(config.DB_URL),
    UserModule,
    AuthModule,
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
