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
const common_2 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const post_dto_1 = require("./Dto/post.dto");
const user_decorator_1 = require("../Decorator/user.decorator");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    addPost(addPostDto) {
        return this.postService.addPost(addPostDto);
    }
    editPost(id, user, editPostDto) {
        return this.postService.editPost(id, editPostDto, user.id);
    }
    getPost(id) {
        return this.postService.getPost(id);
    }
    getAllPostsByUserId(id) {
        return this.postService.getAllPostsByUserId(id);
    }
    deletePost(deletePostDto, user) {
        return this.postService
            .deletePost(deletePostDto.postId, deletePostDto.userId, user)
            .catch((err) => {
            return {
                message: 'Post Not Found!',
                status: false,
                error: err.message,
            };
        });
    }
    likePost(id, user) {
        return this.postService.actionLikePost(id, user.id);
    }
    getAllLikeByPostId(id, user) {
        return this.postService.getAllLikeByPostId(id, user);
    }
};
__decorate([
    (0, common_1.Post)('addPost'),
    (0, common_2.UsePipes)(common_2.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.AddPostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "addPost", null);
__decorate([
    (0, common_1.Post)('editPost/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.getUserLoggedIn)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, post_dto_1.EditPostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "editPost", null);
__decorate([
    (0, common_1.Get)('/getPost/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getPost", null);
__decorate([
    (0, common_1.Get)('/getAllPostsByUserId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getAllPostsByUserId", null);
__decorate([
    (0, common_1.Post)('/deletePost'),
    (0, common_2.UsePipes)(common_2.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.getUserLoggedIn)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.DeletePostDto, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Post)('/actionLikePost/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.getUserLoggedIn)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "likePost", null);
__decorate([
    (0, common_1.Get)('/getAllLikeByPostId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.getUserLoggedIn)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getAllLikeByPostId", null);
PostController = __decorate([
    (0, common_1.Controller)('/post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.default = PostController;
//# sourceMappingURL=post.controller.js.map