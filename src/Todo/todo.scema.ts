import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
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
