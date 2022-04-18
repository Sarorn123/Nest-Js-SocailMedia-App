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
exports.StoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose = require("mongoose");
const user_service_1 = require("../User/user.service");
const story_convert_1 = require("./Convert/story.convert");
const user_convert_1 = require("../User/Convert/user.convert");
let StoryService = class StoryService {
    constructor(storyModel, userService) {
        this.storyModel = storyModel;
        this.userService = userService;
    }
    async getAllStory(user) {
        const my_story = await this.storyModel.find({
            userId: user.id,
            created_at: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        });
        const user_loggedIn_data = await this.userService.getUserById(user.id);
        const user_story_valid = [];
        await Promise.all(user_loggedIn_data.followings.map(async (friId) => {
            const fri_story = await this.storyModel.find({
                userId: friId,
                created_at: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
            });
            if (fri_story.length !== 0) {
                const user_data = await this.userService.getUserById(friId);
                let viewed = false;
                fri_story.map((story_object) => {
                    const existed = story_object.viewers.indexOf(user.id) > -1;
                    if (existed) {
                        viewed = true;
                        return;
                    }
                });
                user_story_valid.push((0, story_convert_1.UserStoryConverter)(user_data, viewed));
            }
        }));
        if (my_story.length !== 0) {
            let viewed = false;
            my_story.map((story_object) => {
                const existed = story_object.viewers.indexOf(user.id) > -1;
                if (existed) {
                    viewed = true;
                    return;
                }
            });
            const my_data = [(0, story_convert_1.UserStoryConverter)(user_loggedIn_data, viewed)];
            return my_data.concat(user_story_valid);
        }
        return user_story_valid;
    }
    async getStory(id, user) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException({ message: 'User Not Found!' });
        }
        const story_array = await this.storyModel.find({
            userId: id,
            created_at: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        });
        const result = [];
        story_array.map((story) => {
            result.push((0, story_convert_1.StoryConverter)(story));
        });
        return result;
    }
    async addStory(user, image_url, image_name) {
        const storyDto = {
            userId: user.id,
            image_url: image_url,
            image_name: image_name,
        };
        return await this.storyModel.create(storyDto);
    }
    async actionViewStory(id, user) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException({
                message: 'Story Not Found!',
                status: false,
            });
        }
        const story = await this.storyModel.findById(id).populate('userId');
        if (story.userId.id === user.id) {
            return { message: 'viewed', status: true };
        }
        const existed = story.viewers.indexOf(user.id) > -1;
        if (existed) {
            return { message: 'viewed', status: true };
        }
        story.viewers.push(user.id);
        story.save();
        return { message: 'viewed', status: true };
    }
    async deleteStory(id, user) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException({ message: 'Story Not Found!' });
        }
        const story = await this.storyModel.findById(id).populate('userId');
        if (user.id !== story.userId.id) {
            throw new common_1.BadRequestException({
                message: 'You Can Only Delete Your Story!',
            });
        }
        return await this.storyModel.remove(story);
    }
    async actionLikeStory(id, user) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException({
                message: 'Story Not Found!',
                status: false,
            });
        }
        const story = await this.storyModel.findById(id).populate('userId');
        if (story.userId.id === user.id) {
            return { message: 'Liked', status: true };
        }
        const liked = story.likes.indexOf(user.id) > -1;
        if (liked) {
            story.likes.splice(story.likes.indexOf(user.id, 1));
            await story.save();
            return {
                message: 'Unliked',
                status: true,
            };
        }
        story.likes.push(user.id);
        story.save();
        return { message: 'Liked', status: true };
    }
    async getAllStoryViewer(id, user) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException({
                message: 'Story Not Found!',
                status: false,
            });
        }
        const story = await this.storyModel.findById(id).populate('userId');
        if (story.userId.id !== user.id) {
            throw new common_1.BadRequestException({
                message: 'You Can Only See Viewer On Your Story!',
                status: false,
            });
        }
        const user_loggedIn = await this.userService.getUserById(user.id);
        const users = [];
        await Promise.all(story.viewers.map(async (userId) => {
            const user = await this.userService.getUserById(userId);
            if (user) {
                const followed = user_loggedIn.followings.indexOf(userId) > -1;
                users.push((0, user_convert_1.userConverter)(user, followed));
            }
        }));
        return users;
    }
    async getStoryById(id) {
        if (!mongoose.isValidObjectId(id)) {
            throw new common_1.BadRequestException({
                message: 'Story Not Found!',
                status: false,
            });
        }
        return await this.storyModel.findById(id);
    }
};
StoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Story')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService])
], StoryService);
exports.StoryService = StoryService;
//# sourceMappingURL=story.service.js.map