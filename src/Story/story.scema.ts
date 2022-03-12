import * as mongoose from 'mongoose';

export const StorySchema = new mongoose.Schema({
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
