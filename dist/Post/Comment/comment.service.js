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
var CommentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose = require("mongoose");
const post_service_1 = require("../post.service");
const comment_convert_1 = require("./Convert/comment.convert");
const user_service_1 = require("../../User/user.service");
const user_convert_1 = require("../../User/Convert/user.convert");
let CommentService = CommentService_1 = class CommentService {
    constructor(commentModel, postService, userService) {
        this.commentModel = commentModel;
        this.postService = postService;
        this.userService = userService;
    }
    async addComment(addCommentDto) {
        if (!addCommentDto.is_reply_to) {
            if (!mongoose.Types.ObjectId.isValid(addCommentDto.userId)) {
                throw new common_1.HttpException({ message: 'User Not Found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!mongoose.Types.ObjectId.isValid(addCommentDto.postId)) {
                throw new common_1.HttpException({ message: 'Post Not Found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.commentModel.create(addCommentDto);
        }
        else {
            if (!addCommentDto.parentId) {
                throw new common_1.HttpException({ message: 'parentId Is Required!', status: false }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!mongoose.Types.ObjectId.isValid(addCommentDto.parentId)) {
                throw new common_1.HttpException({ message: 'Parent Not Found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!mongoose.Types.ObjectId.isValid(addCommentDto.userId)) {
                throw new common_1.HttpException({ message: 'User Not Found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!mongoose.Types.ObjectId.isValid(addCommentDto.postId)) {
                throw new common_1.HttpException({ message: 'Post Not Found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
            }
            const new_comment = await this.commentModel.create(addCommentDto);
            return new_comment;
        }
    }
    async getAllCommentsByPost(postId) {
        const comments = await this.commentModel
            .find({
            postId: postId,
            parentId: null,
        })
            .populate('userId');
        const result = [];
        await Promise.all(comments.map(async (comment) => {
            const children = await this.commentModel
                .find({ parentId: comment.id })
                .populate('userId');
            const array_children = [];
            children.map((child) => {
                const childObject = (0, comment_convert_1.CommentConverter)(child);
                return array_children.push(childObject);
            });
            const comment_data = (0, comment_convert_1.CommentConverter)(comment, array_children);
            result.push(comment_data);
        }));
        return result;
    }
    async editComment(id, editCommentDto, user) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new common_1.HttpException({ message: 'Comment Not found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        const my_comment = await this.commentModel.findById(id).populate('userId');
        if (my_comment.userId.id !== user.id) {
            throw new common_1.HttpException({ message: 'You Can Only Edit Your Comment!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.commentModel.findByIdAndUpdate(id, editCommentDto);
        return await this.commentModel.findById(id);
    }
    async deleteComment(id, user) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new common_1.HttpException({ message: 'Comment Not found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        const my_comment = await this.commentModel.findById(id).populate('userId');
        if (my_comment.userId.id !== user.id) {
            throw new common_1.HttpException({ message: 'You Can Only Delete Your Comment!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.commentModel.findByIdAndDelete(id);
        return {
            message: 'Delete Successfully',
            status: true,
        };
    }
    async actionLikeComment(id, userId) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new common_1.HttpException({ message: 'Comment Not Found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        const comment = await this.commentModel.findById(id);
        const existed = comment.likes.indexOf(userId) > -1;
        if (!existed) {
            comment.likes.push(userId);
            await comment.save();
            return {
                message: 'liked',
                status: true,
            };
        }
        else {
            comment.likes.splice(comment.likes.indexOf(userId), 1);
            await comment.save();
            return {
                message: 'Unliked',
                status: true,
            };
        }
    }
    async getAllLikeByCommentId(id, user) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new common_1.HttpException({ message: 'Comment Not Found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
        }
        const comment = await this.commentModel.findById(id);
        const user_loggedIn = await this.userService.getUserById(user.id);
        const user_data = [];
        await Promise.all(comment.likes.map(async (userId) => {
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
CommentService = CommentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Comment')),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => CommentService_1))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        post_service_1.PostService,
        user_service_1.UserService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map