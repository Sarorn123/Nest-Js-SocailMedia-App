"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const post_module_1 = require("../post.module");
const comment_scema_1 = require("./comment.scema");
const comment_controller_1 = require("./comment.controller");
const comment_service_1 = require("./comment.service");
const common_2 = require("@nestjs/common");
let CommentModule = class CommentModule {
};
CommentModule = __decorate([
    (0, common_2.Global)(),
    (0, common_1.Module)({
        imports: [
            post_module_1.PostModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'Comment', schema: comment_scema_1.CommentSchema }]),
        ],
        controllers: [comment_controller_1.default],
        providers: [comment_service_1.CommentService],
        exports: [comment_service_1.CommentService],
    })
], CommentModule);
exports.CommentModule = CommentModule;
//# sourceMappingURL=comment.module.js.map