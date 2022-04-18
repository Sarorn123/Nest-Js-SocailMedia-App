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
const user_decorator_1 = require("../Decorator/user.decorator");
const story_service_1 = require("./story.service");
let StoryController = class StoryController {
    constructor(storyService) {
        this.storyService = storyService;
    }
    async getAllStory(user) {
        return this.storyService.getAllStory(user).catch((error) => {
            return {
                message: error.message,
                status: false,
            };
        });
    }
    async getStory(user, id) {
        return this.storyService.getStory(id, user).catch((error) => {
            return {
                message: error.message,
                status: false,
            };
        });
    }
    async actionViewStory(user, id) {
        return this.storyService.actionViewStory(id, user);
    }
    async actionLikeStory(user, id) {
        return this.storyService.actionLikeStory(id, user);
    }
    async getAllStoryViewer(user, id) {
        return this.storyService.getAllStoryViewer(id, user);
    }
};
__decorate([
    (0, common_1.Get)('getAllStory'),
    __param(0, (0, user_decorator_1.getUserLoggedIn)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StoryController.prototype, "getAllStory", null);
__decorate([
    (0, common_1.Get)('getStory/:id'),
    __param(0, (0, user_decorator_1.getUserLoggedIn)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StoryController.prototype, "getStory", null);
__decorate([
    (0, common_1.Get)('actionViewStory/:id'),
    __param(0, (0, user_decorator_1.getUserLoggedIn)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StoryController.prototype, "actionViewStory", null);
__decorate([
    (0, common_1.Get)('actionLikeStory/:id'),
    __param(0, (0, user_decorator_1.getUserLoggedIn)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StoryController.prototype, "actionLikeStory", null);
__decorate([
    (0, common_1.Get)('getAllStoryViewer/:id'),
    __param(0, (0, user_decorator_1.getUserLoggedIn)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StoryController.prototype, "getAllStoryViewer", null);
StoryController = __decorate([
    (0, common_1.Controller)('/story'),
    __metadata("design:paramtypes", [story_service_1.StoryService])
], StoryController);
exports.default = StoryController;
//# sourceMappingURL=story.controller.js.map