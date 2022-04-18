"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoSchema = void 0;
const mongoose = require("mongoose");
exports.TodoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        null: false,
    },
    title: {
        type: String,
        maxlength: 255,
    },
    description: {
        type: String,
        maxlength: 500,
    },
    parentId: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
});
//# sourceMappingURL=todo.scema.js.map