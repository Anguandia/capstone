import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: { type: String, required: true, maxlength: 100 },
  body: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() },
});

BlogSchema
  .virtual('url')
  .get(function () {
    return '/' + this._id;
  });

export default mongoose.model('Blog', BlogSchema);