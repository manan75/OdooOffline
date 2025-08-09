const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  permissions: [String],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Admin', adminSchema);
