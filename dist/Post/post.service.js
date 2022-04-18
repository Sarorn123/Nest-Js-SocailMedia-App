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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_service_1 = require("../User/user.service");
const post_convert_1 = require("./Convert/post.convert");
const mongoose = require("mongoose");
const comment_service_1 = require("./Comment/comment.service");
const user_convert_1 = require("../User/Convert/user.convert");
let PostService = class PostService {
    constructor(postModel, userService, commentService) {
        this.postModel = postModel;
        this.userService = userService;
        this.commentService = commentService;
    }
    async addPost(addPostDto) {
        if (!mongoose.Types.ObjectId.isValid(addPostDto.userId)) {
            throw new common_1.HttpException({ message: 'User Not Found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        const new_post = await this.postModel.create(addPostDto);
        this.userService.addPostToUser(addPostDto.userId, new_post);
        const post = await this.postModel
            .findOne({ _id: new_post._id })
            .populate('userId');
        return post;
    }
    async editPost(id, editPostDto, userId) {
        const post = await this.postModel.findById(id).populate('userId');
        if (!post) {
            throw new common_1.HttpException({ message: 'Post Not Found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (userId !== post.userId.id) {
            throw new common_1.HttpException({ message: 'You Can Update Only Your Post!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (editPostDto.caption)
            post.caption = editPostDto.caption;
        if (editPostDto.post_status)
            post.post_status = editPostDto.post_status;
        if (editPostDto.tages)
            post.tages = editPostDto.tages;
        if (editPostDto.image_or_video)
            post.image_or_video = editPostDto.image_or_video;
        await post.save();
        return post;
    }
    async getPost(id) {
        const post = await this.postModel.findById(id).populate('userId');
        if (!post) {
            throw new common_1.HttpException({ message: 'Post Not found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        const comments = await this.commentService.getAllCommentsByPost(id);
        return (0, post_convert_1.postConverter)(post, comments);
    }
    async getAllPostsByUserId(id) {
        return this.userService.getAllPostsByUserId(id);
    }
    async deletePost(postId, userId, user) {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            throw new common_1.HttpException({ message: 'Post Not Found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        const post = await this.postModel.findById(postId);
        if (user.id !== userId) {
            throw new common_1.HttpException({ message: 'You Can Delete Only Your Post!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        await post.remove();
        return this.userService.removePostFromUser(userId, postId, post);
    }
    async actionLikePost(id, userId) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new common_1.HttpException({ message: 'Post Not Found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        const post = await this.postModel.findById(id);
        const existed = post.likes.indexOf(userId) > -1;
        if (!existed) {
            post.likes.push(userId);
            await post.save();
            return {
                message: 'liked',
                status: true,
            };
        }
        else {
            post.likes.splice(post.likes.indexOf(userId), 1);
            await post.save();
            return {
                message: 'Unliked',
                status: true,
            };
        }
    }
    async getAllLikeByPostId(id, user) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new common_1.HttpException({ message: 'Post Not Found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        const post = await this.postModel.findById(id);
        const user_loggedIn = await this.userService.getUserById(user.id);
        const user_data = [];
        await Promise.all(post.likes.map(async (userId) => {
            const user_like = await this.userService.getUserById(userId);
            if (user_like) {
                const followed = user_loggedIn.followings.indexOf(userId) > -1;
                const user_convert = (0, user_convert_1.userConverter)(user_like, followed);
                user_data.push(user_convert);
            }
        }));
        return user_data;
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Post')),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => comment_service_1.CommentService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        comment_service_1.CommentService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map