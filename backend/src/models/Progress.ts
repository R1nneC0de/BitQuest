import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  roomId: { type: Number, required: true },
  challengeId: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  submissions: [{
    code: String,
    language: String,
    status: String,
    submittedAt: { type: Date, default: Date.now }
  }],
  completedAt: Date
});

export default mongoose.model('Progress', progressSchema); 