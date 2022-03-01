"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        maxlength: 255,
        unique: true,
    },
    gender: {
        type: Number,
        maxlength: 1,
    },
    email_or_phone: {
        type: String,
        maxlength: 255,
        lowercase: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        maxlength: 255,
    },
    profile_picture: {
        type: String,
        maxlength: 700,
        default: null,
    },
    cover_picture: {
        type: String,
        maxlength: 700,
        default: null,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    role: {
        type: String,
        default: 'USER',
    },
    craeted_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    },
});
//# sourceMappingURL=user.scema.js.map