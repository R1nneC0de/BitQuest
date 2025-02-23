import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Code2, CheckCircle, Terminal, Cpu, Loader, ExternalLink } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import ReturnButton from '../components/ReturnButton';
import api from '../config/api';
import Editor from '@monaco-editor/react';

type ProgrammingLanguage = 'python' | 'java' | 'cpp';

interface Challenge {
  challengeId: number;
  title: string;
  description: string;
  completed: boolean;
  difficulty: string;
  category: string;
  icon: LucideIcon;
  starterCode: {
    python: string;
    java: string;
    cpp: string;
  };
  testCases: {
    input: string;
    output: string;
  }[];
  helpfulLinks: {
    python: {
      youtube: string;
      website: string;
    };
    java: {
      youtube: string;
      website: string;
    };
    cpp: {
      youtube: string;
      website: string;
    };
  };
}

const Challenges = () => {
  const { roomId } = useParams();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>('python');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    fetchChallenges();
  }, [roomId]);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/challenges/room/${roomId}`);
      console.log('Challenges response:', response.data); // Debug log
      if (response.data.data) {
        setChallenges(response.data.data);
        console.log('Set challenges:', response.data.data); // Debug log
      } else {
        console.error('No data property in response:', response.data);
      }
    } catch (error) {
      console.error('Error fetching challenges:', error);
      setError('Failed to load challenges');
    } finally {
      setLoading(false);
    }
  };

  const selectedChallengeData = selectedChallenge !== null 
    ? challenges.find(c => c.challengeId === selectedChallenge)
    : null;

  const runCode = async () => {
    setIsRunning(true);
    try {
      const response = await api.post(`/challenges/${selectedChallenge}/run`, {
        code,
        language: selectedLanguage
      });
      setOutput(response.data.output);
    } catch (error: any) {
      setOutput(error.response?.data?.error || 'Error running code');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post(`/challenges/${selectedChallenge}/submit`, {
        code,
        language: selectedLanguage
      });
      if (response.data.success) {
        // Update challenge status
        fetchChallenges();
        setOutput('All test cases passed! Challenge completed!');
      } else {
        setOutput('Some test cases failed. Try again!');
      }
    } catch (error: any) {
      setOutput(error.response?.data?.error || 'Error submitting solution');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="flex items-center gap-3">
          <Loader className="animate-spin text-[var(--accent-primary)]" />
          <span className="text-[var(--accent-primary)]">Loading challenges...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (challenges.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="text-center space-y-4">
          <p className="text-[var(--text-primary)]">No challenges available for this room.</p>
          <ReturnButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-8">
      <ReturnButton />
      
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-8">Room {roomId} Challenges</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <div
              key={challenge.challengeId}
              className="bg-[var(--bg-secondary)] p-6 rounded-lg border border-[var(--accent-primary)]/30 cursor-pointer hover:border-[var(--accent-primary)] transition-colors"
              onClick={() => {
                setSelectedChallenge(challenge.challengeId);
                setCode(challenge.starterCode[selectedLanguage]);
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">{challenge.title}</h3>
                {challenge.completed && (
                  <CheckCircle className="text-green-500" size={20} />
                )}
              </div>
              <p className="text-[var(--text-secondary)] mb-4">{challenge.description}</p>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-sm ${
                  challenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                  challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {challenge.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>

        {selectedChallengeData && (
          <div className="mt-8 bg-[var(--bg-secondary)] p-6 rounded-lg border border-[var(--accent-primary)]/30">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{selectedChallengeData.title}</h3>
            <p className="text-[var(--text-secondary)] mb-6">{selectedChallengeData.description}</p>

            <div className="mb-4">
              <select
                value={selectedLanguage}
                onChange={(e) => {
                  setSelectedLanguage(e.target.value as ProgrammingLanguage);
                  setCode(selectedChallengeData.starterCode[e.target.value as ProgrammingLanguage]);
                }}
                className="bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--accent-primary)]/30 rounded px-3 py-2"
              >
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Editor
                  height="400px"
                  language={selectedLanguage}
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>
              
              <div className="space-y-4">
                <div className="bg-black rounded-lg p-4 h-[400px] font-mono text-green-400 overflow-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal size={16} />
                    <span>Output:</span>
                  </div>
                  <pre className="whitespace-pre-wrap">{output}</pre>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={runCode}
                disabled={isRunning}
                className="px-6 py-3 bg-[var(--accent-secondary)] text-white rounded hover:bg-[var(--accent-secondary)]/80 transition-colors disabled:opacity-50"
              >
                {isRunning ? 'Running...' : 'Run Code'}
              </button>

              <button
                onClick={handleSubmit}
                disabled={isRunning}
                className="px-6 py-3 bg-[var(--accent-primary)] text-white rounded hover:bg-[var(--accent-primary)]/80 transition-colors disabled:opacity-50"
              >
                Submit Solution
              </button>
            </div>

            <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
              <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">Helpful Resources:</h4>
              <div className="flex gap-4">
                <a
                  href={selectedChallengeData.helpfulLinks[selectedLanguage].youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]"
                >
                  <ExternalLink size={16} />
                  Watch Tutorial
                </a>
                <a
                  href={selectedChallengeData.helpfulLinks[selectedLanguage].website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]"
                >
                  <ExternalLink size={16} />
                  Read Documentation
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenges;