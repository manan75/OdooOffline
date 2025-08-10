import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false }, // select:false hides in queries
  avatar: String,
  createdAt: { type: Date, default: Date.now }
});

export default model('User', userSchema);

