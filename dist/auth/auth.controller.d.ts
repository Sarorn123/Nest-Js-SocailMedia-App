import { UserLoginDto } from './dto/userLogin.dto';
import { AuthService } from './auth.service';
import { UserSignupDto, UpdateUserDto } from './dto/userSignup.dto';
import { UserService } from '../User/user.service';
import { User } from '../User/user.interface';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    singup(userSignupDto: UserSignupDto): Promise<any>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    login(userLogindto: UserLoginDto): Promise<Object>;
}
