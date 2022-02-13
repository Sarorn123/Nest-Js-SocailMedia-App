import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInformation } from './user.information.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserInformationService {
  constructor(
    @InjectRepository(UserInformation)
    private UserInformationRepository: Repository<UserInformation>,
  ) {}

  async createUserInformation(user_data: any) {
    const user_info = new UserInformation();
    user_info.lastname = user_data.lastname;
    user_info.firstname = user_data.firstname;
    user_info.fullname = user_data.fullname;
    user_info.user = user_data;
    this.UserInformationRepository.save(user_info);
  }
}
