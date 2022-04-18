"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorySchema = void 0;
const mongoose = require("mongoose");
exports.StorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        null: false,
    },
    image_url: {
        type: String,
        maxlength: 1000,
        null: false,
    },
    image_name: {
        type: String,
        maxlength: 1000,
        null: false,
    },
    likes: {
        type: [String],
        default: [],
    },
    viewers: {
        type: [String],
        default: [],
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
});
//# sourceMappingURL=story.scema.js.map