import { Module } from '@nestjs/common';
import { UserInformationController } from './user.information.controller';
import { UserInformationService } from './user.information.service';
import { UserInformation } from './user.information.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserInformationController],
  providers: [UserInformationService],
  imports: [TypeOrmModule.forFeature([UserInformation])],
  exports: [UserInformationService],
})
export class UserInformationModule {}
