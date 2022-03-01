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
exports.DeletePostDto = exports.EditPostDto = exports.AddPostDto = void 0;
const class_validator_1 = require("class-validator");
class AddPostDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddPostDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddPostDto.prototype, "caption", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AddPostDto.prototype, "tages", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUppercase)(),
    __metadata("design:type", String)
], AddPostDto.prototype, "post_status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AddPostDto.prototype, "image_or_video", void 0);
exports.AddPostDto = AddPostDto;
class EditPostDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EditPostDto.prototype, "caption", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], EditPostDto.prototype, "tages", void 0);
__decorate([
    (0, class_validator_1.IsUppercase)(),
    __metadata("design:type", String)
], EditPostDto.prototype, "post_status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], EditPostDto.prototype, "image_or_video", void 0);
exports.EditPostDto = EditPostDto;
class DeletePostDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'userId is required!' }),
    __metadata("design:type", String)
], DeletePostDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'postId is required!' }),
    __metadata("design:type", String)
], DeletePostDto.prototype, "postId", void 0);
exports.DeletePostDto = DeletePostDto;
//# sourceMappingURL=post.dto.js.map