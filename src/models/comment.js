import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  blog: { type: Schema.Types.ObjectId, ref: 'Blog' },
  body: String,
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() },
});

export default mongoose.model('Comment', CommentSchema);