import express, { Request } from 'express';
import Challenge from '../models/Challenge';
import Progress from '../models/Progress';
import { generateChallenge } from '../services/ollamaService';
import { authMiddleware } from '../middleware/auth';
import { runCode } from '../services/codeExecutionService';

// Define interface for authenticated request
interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

// Define interface for test case
interface TestCase {
  input: string;
  output: string;
}

// Define interface for test result
interface TestResult {
  input: string;
  expectedOutput?: string;
  actualOutput?: string;
  error?: string;
  passed: boolean;
}

const router = express.Router();

// Get challenges for a room
router.get('/room/:roomId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { roomId } = req.params;
    console.log('Fetching challenges for room:', roomId);
    const challenges = await Challenge.find({ roomId: Number(roomId) });
    console.log('Found challenges:', challenges);
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
    
    const output = await runCode(code, language);
    res.json({ output });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ error: 'Error running code: ' + errorMessage });
  }
});

// Submit solution
router.post('/:challengeId/submit', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { challengeId } = req.params;
    const { code, language } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const challenge = await Challenge.findOne({ challengeId: Number(challengeId) });
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    let allTestsPassed = true;
    const results: TestResult[] = [];

    for (const testCase of challenge.testCases as TestCase[]) {
      try {
        const output = await runCode(code, language, testCase.input || '');
        // Normalize both outputs by trimming whitespace and converting to lowercase
        const normalizedOutput = output.trim().toLowerCase();
        const normalizedExpected = testCase.output.trim().toLowerCase();
        const passed = normalizedOutput === normalizedExpected;
        
        results.push({
          input: testCase.input,
          expectedOutput: testCase.output,
          actualOutput: output,
          passed
        });
        
        if (!passed) allTestsPassed = false;
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        results.push({
          input: testCase.input,
          error: errorMessage,
          passed: false
        });
        allTestsPassed = false;
      }
    }

    if (allTestsPassed) {
      await Progress.findOneAndUpdate(
        { userId, challengeId: Number(challengeId) },
        { completed: true },
        { upsert: true }
      );
      
      res.json({ 
        success: true, 
        message: 'All test cases passed! Challenge completed!',
        results 
      });
    } else {
      res.json({ 
        success: false, 
        message: 'Some test cases failed. Try again!',
        results 
      });
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ 
      error: 'Error submitting solution: ' + errorMessage,
      success: false 
    });
  }
});

export default router; 