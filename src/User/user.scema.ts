import { IsEmail } from 'class-validator';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
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
  photos_or_videos: {
    type: Array,
    default: [],
  },
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
