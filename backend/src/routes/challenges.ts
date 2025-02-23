import express, { Request } from 'express';
import Challenge from '../models/Challenge';
import Progress from '../models/Progress';
import { generateChallenge } from '../services/ollamaService';
import { authMiddleware } from '../middleware/auth';

// Define interface for authenticated request
interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

const router = express.Router();

// Get challenges for a room
router.get('/room/:roomId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { roomId } = req.params;
    console.log('Fetching challenges for room:', roomId); // Debug log
    const challenges = await Challenge.find({ roomId: Number(roomId) });
    console.log('Found challenges:', challenges); // Debug log
    res.json({ data: challenges });
  } catch (error) {
    console.error('Error fetching challenges:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Submit challenge solution
router.post('/submit/:challengeId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { challengeId } = req.params;
    const { code, language } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Add submission logic here
    // You'll need to implement code execution and testing

    res.json({ status: 'success' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Run code
router.post('/:challengeId/run', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { challengeId } = req.params;
    const { code, language } = req.body;
    
    // Here you would actually run the code and get output
    // For now, we'll just return the code as output
    res.json({ output: `Running ${language} code:\n${code}` });
  } catch (error) {
    res.status(500).json({ error: 'Error running code' });
  }
});

// Submit solution
router.post('/:challengeId/submit', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { challengeId } = req.params;
    const { code, language } = req.body;
    const userId = req.user?.id;

    // Here you would:
    // 1. Run the code against all test cases
    // 2. Update the user's progress
    // 3. Return success/failure

    // For now, we'll just return success
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting solution' });
  }
});

export default router; 