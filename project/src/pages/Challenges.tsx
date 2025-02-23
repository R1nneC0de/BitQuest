import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Code2, CheckCircle, Terminal, Cpu, Loader, ExternalLink, XCircle, Play, Send, RefreshCw } from 'lucide-react';
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
  const [runOutput, setRunOutput] = useState('');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [runStatus, setRunStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
    setRunStatus('idle');
    try {
      const response = await api.post(`/challenges/${selectedChallenge}/run`, {
        code,
        language: selectedLanguage
      });
      setRunOutput(response.data.output);
      setRunStatus('success');
    } catch (error: any) {
      setRunOutput(error.response?.data?.error || 'Error running code');
      setRunStatus('error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    setTestResults([]);
    try {
      const response = await api.post(`/challenges/${selectedChallenge}/submit`, {
        code,
        language: selectedLanguage
      });
      
      setTestResults(response.data.results);
      setRunOutput(response.data.message);
      setRunStatus(response.data.success ? 'success' : 'error');
      
      if (response.data.success) {
        // Refresh challenges to update completion status
        fetchChallenges();
      }
    } catch (error: any) {
      setRunOutput(error.response?.data?.error || 'Error submitting solution');
      setRunStatus('error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleRestart = () => {
    setRunOutput('');
    setTestResults([]);
    setRunStatus('idle');
    setOutput('');
    // Reset code to starter code
    if (selectedChallengeData) {
      setCode(selectedChallengeData.starterCode[selectedLanguage]);
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
                <div className="bg-black rounded-lg p-4 h-[400px] font-mono overflow-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal size={16} className={
                      runStatus === 'success' ? 'text-green-400' :
                      runStatus === 'error' ? 'text-red-400' :
                      'text-gray-400'
                    } />
                    <span>Output:</span>
                  </div>
                  <pre className={`whitespace-pre-wrap ${
                    runStatus === 'success' ? 'text-green-400' :
                    runStatus === 'error' ? 'text-red-400' :
                    'text-gray-400'
                  }`}>
                    {runOutput}
                  </pre>

                  {testResults.length > 0 && (
                    <div className="mt-4 border-t border-gray-700 pt-4">
                      <div className="text-gray-400 mb-2">Test Results:</div>
                      {testResults.map((result, index) => (
                        <div key={index} className={`mb-2 p-2 rounded ${
                          result.passed ? 'bg-green-900/30' : 'bg-red-900/30'
                        }`}>
                          <div className="flex items-center gap-2">
                            {result.passed ? (
                              <CheckCircle size={16} className="text-green-400" />
                            ) : (
                              <XCircle size={16} className="text-red-400" />
                            )}
                            <span className={result.passed ? 'text-green-400' : 'text-red-400'}>
                              Test Case {index + 1}
                            </span>
                          </div>
                          <div className="text-gray-400 text-sm mt-1">
                            <div>Input: {result.input}</div>
                            <div>Expected: {result.expectedOutput}</div>
                            <div>Got: {result.actualOutput || result.error}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={runCode}
                disabled={isRunning}
                className={`px-6 py-3 rounded flex items-center gap-2 transition-colors ${
                  isRunning
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-[var(--accent-secondary)] text-white hover:bg-[var(--accent-secondary)]/80'
                }`}
              >
                {isRunning ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    Run Code
                  </>
                )}
              </button>

              <button
                onClick={handleSubmit}
                disabled={isRunning}
                className={`px-6 py-3 rounded flex items-center gap-2 transition-colors ${
                  isRunning
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary)]/80'
                }`}
              >
                {isRunning ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Solution
                  </>
                )}
              </button>

              <button
                onClick={handleRestart}
                disabled={isRunning}
                className="px-6 py-3 rounded flex items-center gap-2 bg-gray-600 text-white hover:bg-gray-700 transition-colors"
              >
                <RefreshCw size={16} />
                Restart
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