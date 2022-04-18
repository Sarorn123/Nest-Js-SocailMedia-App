"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./User/user.module");
const mongoose_1 = require("@nestjs/mongoose");
const route_protection_1 = require("./auth/route.protection");
const core_1 = require("@nestjs/core");
const post_module_1 = require("./Post/post.module");
const comment_module_1 = require("./Post/Comment/comment.module");
const keys_1 = require("./Keys/keys");
const file_module_1 = require("./File/file.module");
const story_module_1 = require("./Story/story.module");
const todo_module_1 = require("./Todo/todo.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(keys_1.keys.DB_URI),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            post_module_1.PostModule,
            comment_module_1.CommentModule,
            file_module_1.FileModule,
            story_module_1.StoryModule,
            todo_module_1.TodoModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: route_protection_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map