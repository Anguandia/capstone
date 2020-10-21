import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: String,
  password: String,
  blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() },
});

UserSchema
  .virtual('url')
  .get(function () {
    return '/users/' + this._id;
  });

export default mongoose.model('User', UserSchema);