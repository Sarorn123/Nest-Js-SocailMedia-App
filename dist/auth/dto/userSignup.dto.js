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
exports.UpdateUserDto = exports.UserSignupDto = void 0;
const class_validator_1 = require("class-validator");
class UserSignupDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'fullname is require !' }),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UserSignupDto.prototype, "fullname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'gender is require !' }),
    __metadata("design:type", Number)
], UserSignupDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'email_or_phone is require !' }),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UserSignupDto.prototype, "email_or_phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'password is require !' }),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UserSignupDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'confirm password is require !' }),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UserSignupDto.prototype, "confirm_password", void 0);
exports.UserSignupDto = UserSignupDto;
class UpdateUserDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "fullname", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email_or_phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "confirm_password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "profile_picture", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "cover_picture", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", Array)
], UpdateUserDto.prototype, "photos_or_videos", void 0);
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=userSignup.dto.js.map