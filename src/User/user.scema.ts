import { IsEmail } from 'class-validator';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    max: 255,
  },
  email_or_phone: {
    type: String,
    max: 255,
  },

  password: {
    type: String,
    max: 255,
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
