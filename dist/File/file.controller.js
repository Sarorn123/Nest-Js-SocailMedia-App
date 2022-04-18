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
exports.storage = exports.FILEPATH = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const platform_express_1 = require("@nestjs/platform-express");
const path = require("path");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
const uuid_1 = require("uuid");
const user_service_1 = require("../User/user.service");
const common_2 = require("@nestjs/common");
const route_protection_1 = require("../auth/route.protection");
const fs = require("fs");
const story_service_1 = require("../Story/story.service");
const user_decorator_1 = require("../Decorator/user.decorator");
exports.FILEPATH = {
    PROFILE_PICTURE: './Uploads/ProfilePictures/',
    STORY_PICTURE: './Uploads/StoryPictures/',
};
function storage(filePath) {
    return {
        storage: (0, multer_1.diskStorage)({
            destination: filePath,
            filename: (req, file, cb) => {
                const filename = path.parse(file.originalname).name.replace(/\s/g, '') + (0, uuid_1.v4)();
                const extension = path.parse(file.originalname).ext;
                cb(null, `${filename}${extension}`);
            },
        }),
    };
}
exports.storage = storage;
let FileController = class FileController {
    constructor(userService, storyService) {
        this.userService = userService;
        this.storyService = storyService;
    }
    uploadSinglePicture(file, id, req) {
        const image_url = req.protocol +
            '://' +
            req.get('host') +
            `/file/upload/getProfilePicture/${file.filename}`;
        return this.userService
            .updateProfilePicture(id, image_url, exports.FILEPATH.PROFILE_PICTURE, file.filename)
            .catch((err) => {
            return {
                message: 'User Not Found!',
                status: false,
                error: err.message,
            };
        });
    }
    async getProfilePicture(res, filename) {
        return (0, rxjs_1.of)(res.sendFile((0, path_1.join)(process.cwd(), exports.FILEPATH.PROFILE_PICTURE + filename)));
    }
    async deleteFile(filename) {
        try {
            fs.unlinkSync(exports.FILEPATH.PROFILE_PICTURE + filename);
            return 'Delete Successfully';
        }
        catch (error) {
            return error.message;
        }
    }
    addStoryImage(file, req, user) {
        const image_url = req.protocol +
            '://' +
            req.get('host') +
            `/file/upload/getStoryImage/${file.filename}`;
        return this.storyService
            .addStory(user, image_url, file.filename)
            .catch((err) => {
            return {
                message: err.message,
                status: false,
                error: err.message,
            };
        });
    }
    async getStoryImage(res, filename) {
        return (0, rxjs_1.of)(res.sendFile((0, path_1.join)(process.cwd(), exports.FILEPATH.STORY_PICTURE + filename)));
    }
    async deleteStoryFile(id, user) {
        const story = await this.storyService.getStoryById(id);
        if (story === null) {
            throw new common_2.BadRequestException({
                message: 'Story Not Found!',
                status: false,
            });
        }
        this.storyService.deleteStory(id, user).catch((err) => {
            return {
                message: err.message,
                status: false,
            };
        });
        try {
            fs.unlinkSync(exports.FILEPATH.STORY_PICTURE + story.image_name);
            return { message: 'Delete Sucessfully', status: true };
        }
        catch (error) {
            return error.message;
        }
    }
};
__decorate([
    (0, common_1.Post)('/ProfilePicture/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', storage(exports.FILEPATH.PROFILE_PICTURE))),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "uploadSinglePicture", null);
__decorate([
    (0, route_protection_1.Public)(),
    (0, common_2.Get)('/getProfilePicture/:filename'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getProfilePicture", null);
__decorate([
    (0, common_2.Get)('/deleteFile/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "deleteFile", null);
__decorate([
    (0, common_1.Post)('/addStoryImage'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', storage(exports.FILEPATH.STORY_PICTURE))),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, user_decorator_1.getUserLoggedIn)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "addStoryImage", null);
__decorate([
    (0, route_protection_1.Public)(),
    (0, common_2.Get)('/getStoryImage/:filename'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getStoryImage", null);
__decorate([
    (0, common_2.Delete)('/deleteStoryFile/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.getUserLoggedIn)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "deleteStoryFile", null);
FileController = __decorate([
    (0, common_1.Controller)('/file/upload'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        story_service_1.StoryService])
], FileController);
exports.default = FileController;
//# sourceMappingURL=file.controller.js.map