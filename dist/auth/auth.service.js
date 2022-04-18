"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../User/user.service");
const Bcrypt_1 = require("../Hash/Bcrypt");
const user_convert_1 = require("../User/Convert/user.convert");
let AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async signup(userSignupDto) {
        if (userSignupDto.password !== userSignupDto.confirm_password) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Confirm password not match!',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.userService.addUser(userSignupDto);
    }
    async login(userLoginDto) {
        const user = await this.userService.LoginUser(userLoginDto);
        if (!user) {
            throw new common_1.UnauthorizedException({ message: 'Invalid cridentail' });
        }
        if (!(0, Bcrypt_1.comparePassword)(userLoginDto.password, user.password)) {
            throw new common_1.UnauthorizedException({ message: 'Invalid password' });
        }
        return this.userToJwtToken(user, user.id, user.email_or_phone, user.role);
    }
    userToJwtToken(user, userId, email, type) {
        const token = this.jwtService.sign({
            sub: userId,
            email,
            type: type,
        });
        return {
            user: (0, user_convert_1.userConverter)(user),
            jwt_token: token,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map