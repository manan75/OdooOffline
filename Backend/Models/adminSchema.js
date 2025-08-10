import { Schema, model } from 'mongoose';

const adminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  permissions: [String],
  createdAt: { type: Date, default: Date.now }
});
export default model('Admin', adminSchema);

