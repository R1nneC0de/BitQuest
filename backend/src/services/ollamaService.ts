import axios from 'axios';

const OLLAMA_ENDPOINT = process.env.OLLAMA_ENDPOINT || 'http://localhost:11434';

interface ChallengePrompt {
  roomId: 1 | 2 | 3 | 4;  // Restrict to valid room IDs
  challengeId: number;
  category: string;
  difficulty: string;
}

const categoryPrompts: Record<ChallengePrompt['roomId'], string> = {
  1: 'basic programming',
  2: 'cybersecurity',
  3: 'fintech',
  4: 'healthcare technology'
};

export const generateChallenge = async (prompt: ChallengePrompt) => {
  const systemPrompt = `Generate a coding challenge for ${categoryPrompts[prompt.roomId]} with the following structure:
    - Title
    - Description
    - Example input/output
    - Starter code in Python, Java, and C++
    - Test cases
    - Helpful resources (1 YouTube video and 1 website) for each programming language
    Difficulty level: ${prompt.difficulty}`;

  try {
    const response = await axios.post(OLLAMA_ENDPOINT + '/api/generate', {
      model: process.env.OLLAMA_MODEL || 'codellama',
      prompt: systemPrompt,
      stream: false
    });

    return response.data;
  } catch (error) {
    console.error('Ollama API error:', error);
    throw error;
  }
}; 