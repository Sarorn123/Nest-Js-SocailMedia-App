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
const common_1 = require("@nestjs/common");
const Comment_dto_1 = require("./Dto/Comment.dto");
const comment_service_1 = require("./comment.service");
const user_decorator_1 = require("../../Decorator/user.decorator");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    addComment(addCommentDto, user) {
        const userId = user.id;
        addCommentDto = Object.assign(Object.assign({}, addCommentDto), { userId });
        return this.commentService.addComment(addCommentDto);
    }
    async editComment(id, editPostDto, user) {
        return this.commentService
            .editComment(id, editPostDto, user)
            .catch((error) => {
            return {
                message: 'Comment Not Found!',
                status: false,
                error: error.message,
            };
        });
    }
    async deleteComment(id, user) {
        return this.commentService.deleteComment(id, user).catch((error) => {
            return {
                message: 'Comment Not Found!',
                status: false,
                error: error.message,
            };
        });
    }
    async actionLikeComment(id, user) {
        return this.commentService.actionLikeComment(id, user.id).catch((error) => {
            return {
                message: 'Comment Not Found!',
                status: false,
                error: error.message,
            };
        });
    }
    async getAllLikeByCommentId(id, user) {
        return this.commentService
            .getAllLikeByCommentId(id, user)
            .catch((error) => {
            return {
                message: 'Comment Not Found!',
                status: false,
                error: error.message,
            };
        });
    }
};
__decorate([
    (0, common_1.Post)('addComment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.getUserLoggedIn)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Comment_dto_1.AddCommentDto, Object]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "addComment", null);
__decorate([
    (0, common_1.Put)('editComment/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.getUserLoggedIn)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Comment_dto_1.EditCommentDto, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "editComment", null);
__decorate([
    (0, common_1.Delete)('/deleteComment/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.getUserLoggedIn)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteComment", null);
__decorate([
    (0, common_1.Get)('/actionLikeComment/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.getUserLoggedIn)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "actionLikeComment", null);
__decorate([
    (0, common_1.Get)('/getAllLikeByCommentId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.getUserLoggedIn)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getAllLikeByCommentId", null);
CommentController = __decorate([
    (0, common_1.Controller)('/comment'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.default = CommentController;
//# sourceMappingURL=comment.controller.js.map