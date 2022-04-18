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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const Bcrypt_1 = require("../Hash/Bcrypt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_convert_1 = require("./Convert/user.convert");
const mongoose = require("mongoose");
const post_convert_1 = require("../Post/Convert/post.convert");
const fs = require("fs");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async addUser(userSignupDto) {
        const fullname_existed = await this.userModel.findOne({
            fullname: userSignupDto.fullname,
        });
        if (fullname_existed) {
            throw new common_1.HttpException({ message: 'Fullname Already Exist!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        const email_or_phone_exited = await this.userModel.findOne({
            email_or_phone: userSignupDto.email_or_phone,
        });
        if (email_or_phone_exited) {
            throw new common_1.HttpException({ message: 'Email Or Phone Already Exist!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        const password = (0, Bcrypt_1.bcryptPassword)(userSignupDto.password);
        userSignupDto = Object.assign(Object.assign({}, userSignupDto), { password });
        const user = await this.userModel.create(userSignupDto);
        return (0, user_convert_1.userConverter)(user);
    }
    async editUser(id, updateUserDto) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.HttpException({ message: 'User Not Found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        const fullname_existed = await this.userModel
            .findOne({
            fullname: updateUserDto.fullname,
        })
            .where('_id')
            .ne(id);
        if (fullname_existed) {
            throw new common_1.HttpException({ message: 'Email Or Phone Already Exist!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        const email_or_phone_exited = await this.userModel
            .findOne({
            email_or_phone: updateUserDto.email_or_phone,
        })
            .where('_id')
            .ne(id);
        if (email_or_phone_exited) {
            throw new common_1.HttpException({ message: 'Email Or Phone Already Exist!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (updateUserDto.password) {
            if (!updateUserDto.confirm_password) {
                throw new common_1.HttpException({ message: 'Confirm_password Is Requred!', status: false }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (updateUserDto.password !== updateUserDto.confirm_password) {
                throw new common_1.HttpException({ message: 'Confirm_password Not Correct!', status: false }, common_1.HttpStatus.BAD_REQUEST);
            }
            if ((0, Bcrypt_1.comparePassword)(updateUserDto.password, user.password)) {
                throw new common_1.HttpException({ message: 'New Password Can Not Same Old Password!', status: false }, common_1.HttpStatus.BAD_REQUEST);
            }
            const password = (0, Bcrypt_1.bcryptPassword)(updateUserDto.password);
            updateUserDto = Object.assign(Object.assign({}, updateUserDto), { password });
        }
        if (updateUserDto.fullname)
            user.fullname = updateUserDto.fullname;
        if (updateUserDto.email_or_phone)
            user.email_or_phone = updateUserDto.email_or_phone;
        if (updateUserDto.password)
            user.password = updateUserDto.password;
        user.updated_at = new Date();
        await user.save();
        return (0, user_convert_1.userConverter)(user);
    }
    async LoginUser(userLoginDto) {
        const user = await this.userModel.findOne({
            email_or_phone: userLoginDto.email_or_phone,
        });
        return user;
    }
    async addPostToUser(id, post) {
        const user = await this.userModel.findById(id);
        user.posts.push(post);
        return await user.save();
    }
    async removePostFromUser(id, post_id, post) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new common_1.HttpException({ message: 'User Not Found!', satus: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.userModel.findById(id);
        user.posts.splice(user.posts.indexOf(post_id), 1);
        await user.save();
        return post;
    }
    async getAllPostsByUserId(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new common_1.HttpException({ message: 'User Not Found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.userModel.findById(id).populate('posts');
        return user.posts.map((post) => (0, post_convert_1.postConverter)(post));
    }
    async getUserById(id) {
        return await this.userModel.findById(id);
    }
    async updateProfilePicture(id, image_url, file_path, new_file_name) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new common_1.HttpException({
                message: 'User Not found!',
                status: false,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.userModel.findById(id);
        try {
            fs.unlinkSync(file_path + user.profile_picture_name);
        }
        catch (error) { }
        user.profile_picture = image_url;
        user.profile_picture_name = new_file_name;
        await user.save();
        return (0, user_convert_1.userConverter)(user);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map