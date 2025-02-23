import express, { Request } from 'express';
import Progress from '../models/Progress';
import User from '../models/User';
import { authMiddleware } from '../middleware/auth';
import { AuthRequest } from '../types/express';

const router = express.Router();

// Get user progress
router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const progress = await Progress.find({ userId: req.user?.id });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get room progress
router.get('/room/:roomId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { roomId } = req.params;
    const progress = await Progress.find({
      userId: req.user?.id,
      roomId: Number(roomId)
    });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 