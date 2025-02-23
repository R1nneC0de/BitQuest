import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  currentRoom: { type: Number, default: 1 },
  preferredLanguage: { type: String, enum: ['python', 'java', 'cpp'], default: 'python' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema); 