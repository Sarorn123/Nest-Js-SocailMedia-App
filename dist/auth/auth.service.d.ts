import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/userLogin.dto';
import { UserSignupDto } from './dto/userSignup.dto';
import { UserService } from '../User/user.service';
import { User } from '../User/user.interface';
export declare class AuthService {
    private jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    signup(userSignupDto: UserSignupDto): Promise<User>;
    login(userLoginDto: UserLoginDto): Promise<Object>;
    userToJwtToken(user: User, userId: string, email: string, type: string): Object;
}
