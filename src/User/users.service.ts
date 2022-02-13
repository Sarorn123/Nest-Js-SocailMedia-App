import { Injectable } from '@nestjs/common';
import { UserSignupDto } from '../auth/dto/userSignup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { bcryptPassword } from '../Hash/Bcrypt';
import { UserInformationService } from '../UserInfomation/user.information.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userInformationService: UserInformationService,
  ) {}

  async createUser(userSignupDto: UserSignupDto): Promise<User> {
    const password = bcryptPassword(userSignupDto.password);
    const new_user = this.userRepository.create({ ...userSignupDto, password }); // Just Add Password To object
    new_user.fullname = new_user.lastname + ' ' + new_user.firstname;
    new_user.user_type = 'USER';
    const user_data = await this.userRepository.save(new_user);
    this.userInformationService.createUserInformation(user_data);

    return user_data;
  }
}
