"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowService = void 0;
const user_service_1 = require("../user.service");
const common_1 = require("@nestjs/common");
const mongoose = require("mongoose");
const user_convert_1 = require("../Convert/user.convert");
let FollowService = class FollowService extends user_service_1.UserService {
    async actionFollowing(follower_id, following_id) {
        if (!mongoose.Types.ObjectId.isValid(follower_id)) {
            throw new common_1.HttpException({ message: 'Follower User Not Found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (!mongoose.Types.ObjectId.isValid(following_id)) {
            throw new common_1.HttpException({ message: 'Following User Not Found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (follower_id === following_id) {
            throw new common_1.HttpException({ message: 'You Can Not Follow Yourself!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        const follower = await this.userModel.findOne({ _id: follower_id });
        const following = await this.userModel.findOne({ _id: following_id });
        const existed = follower.followers.indexOf(following_id) > -1;
        if (!existed) {
            follower.followers.push(following_id);
            follower.save();
            following.followings.push(follower_id);
            following.save();
            return {
                message: 'Followed',
                status: true,
            };
        }
        else {
            follower.followers.splice(follower.followers.indexOf(following_id), 1);
            follower.save();
            following.followings.splice(following.followings.indexOf(follower_id, 1));
            following.save();
            return {
                message: 'UnFollowed',
                status: true,
            };
        }
    }
    async getAllUserFollowing(id, user) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new common_1.HttpException({ message: 'User Not Found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        const user_loggedIn_data = await this.userModel.findById(user.id);
        const user_data = await this.userModel.findById(id);
        const user_following_array = [];
        await Promise.all(user_data.followings.map(async (userId) => {
            const user_following = await this.userModel.findById(userId);
            if (user_following) {
                const followed = user_loggedIn_data.followings.indexOf(userId) > -1;
                const user_convert = (0, user_convert_1.userConverter)(user_following, followed);
                user_following_array.push(user_convert);
            }
        }));
        return user_following_array;
    }
    async getAllUserFollower(id, user) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new common_1.HttpException({ message: 'User Not Found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        const user_loggedIn_data = await this.userModel.findById(user.id);
        const user_data = await this.userModel.findById(id);
        const user_follower_array = [];
        await Promise.all(user_data.followers.map(async (userId) => {
            const user_follower = await this.userModel.findById(userId);
            if (user_follower) {
                const followed = user_loggedIn_data.followings.indexOf(userId) > -1;
                const user_convert = (0, user_convert_1.userConverter)(user_follower, followed);
                user_follower_array.push(user_convert);
            }
        }));
        return user_follower_array;
    }
};
FollowService = __decorate([
    (0, common_1.Injectable)()
], FollowService);
exports.FollowService = FollowService;
//# sourceMappingURL=follow.service.js.map