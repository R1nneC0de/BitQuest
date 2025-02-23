import dotenv from 'dotenv';

dotenv.config();

export const OLLAMA_CONFIG = {
  endpoint: process.env.OLLAMA_ENDPOINT || 'http://localhost:11434',
  model: process.env.OLLAMA_MODEL || 'codellama',
  temperature: 0.7,
  maxTokens: 2048
}; 