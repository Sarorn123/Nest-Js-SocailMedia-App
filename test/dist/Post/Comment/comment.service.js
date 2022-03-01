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
let CommentService = CommentService_1 = class CommentService {
    constructor(commentModel, postService) {
        this.commentModel = commentModel;
        this.postService = postService;
    }
    async addComment(addCommentDto) {
        if (!addCommentDto.is_reply_to) {
            if (!mongoose.Types.ObjectId.isValid(addCommentDto.userId)) {
                throw new common_1.HttpException({ message: 'User Not Found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!mongoose.Types.ObjectId.isValid(addCommentDto.postId)) {
                throw new common_1.HttpException({ message: 'Post Not Found!', status: false }, common_1.HttpStatus.BAD_REQUEST);
            }
            const new_comment = await this.commentModel.create(addCommentDto);
            this.postService.addCommentToPost(addCommentDto.postId, new_comment);
            return new_comment;
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
    async getAllCommentsByPost(id) {
        const comments = await this.commentModel
            .find({
            postId: id,
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
};
CommentService = CommentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Comment')),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => CommentService_1))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        post_service_1.PostService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map