import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    null: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    null: false,
  },
  body: {
    type: String,
    maxlength: 1000,
    null: false,
  },
  likes: {
    type: [String],
  },
  parentId: {
    type: String,
    default: null,
  },
  is_reply_to: {
    type: Boolean,
    default: false,
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
