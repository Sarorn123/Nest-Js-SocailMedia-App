"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const mongoose = require("mongoose");
exports.PostSchema = new mongoose.Schema({
    caption: {
        type: String,
        maxlength: 500,
    },
    image_or_video: [String],
    post_status: {
        type: String,
        uppercase: true,
        maxlength: 20,
    },
    tages: [String],
    likes: [String],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    },
});
//# sourceMappingURL=post.scema.js.map