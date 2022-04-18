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
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_service_1 = require("../User/user.service");
let TodoService = class TodoService {
    constructor(todoModel, userService) {
        this.todoModel = todoModel;
        this.userService = userService;
    }
    async getAllTodoCategory(user) {
        const categories = await this.todoModel.find({
            userId: user.id,
            parentId: null,
        });
        const all = [];
        if (categories.length !== 0) {
            await Promise.all(categories.map(async (category) => {
                const category_child = await this.todoModel.find({
                    parentId: category.id,
                });
                const data = {
                    id: category.id,
                    title: category.title,
                    description: category.description,
                    created_at: category.created_at,
                    children: category_child,
                };
                return all.push(data);
            }));
        }
        return all;
    }
    async getCategory(user, id) {
        const todo = await this.todoModel.findById(id);
        const todo_child = await this.todoModel.find({ parentId: todo.id });
        const data = {
            id: todo.id,
            title: todo.title,
            description: todo.description,
            created_at: todo.created_at,
            children: todo_child,
        };
        return data;
    }
    async addTodo(user, addTodoDto) {
        const userId = user.id;
        addTodoDto = Object.assign(Object.assign({}, addTodoDto), { userId });
        const new_todo = await this.todoModel.create(addTodoDto);
        return new_todo;
    }
    async updateTodo(user, addTodoDto, id) {
        const todo_id = await (await this.todoModel.findByIdAndUpdate(id, addTodoDto)).id;
        return await this.todoModel.findById(todo_id);
    }
    async deleteTodo(id) {
        return await this.todoModel.findByIdAndRemove(id);
    }
};
TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Todo')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map