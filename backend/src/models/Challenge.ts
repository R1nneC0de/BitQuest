import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
  roomId: { type: Number, required: true },
  challengeId: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true },
  category: { type: String, required: true },
  starterCode: {
    python: String,
    java: String,
    cpp: String
  },
  testCases: [{
    input: String,
    output: String
  }],
  helpfulLinks: {
    python: {
      youtube: String,
      website: String
    },
    java: {
      youtube: String,
      website: String
    },
    cpp: {
      youtube: String,
      website: String
    }
  }
});

export default mongoose.model('Challenge', challengeSchema); 