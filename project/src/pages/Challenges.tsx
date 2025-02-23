import React from 'react';
import { useParams } from 'react-router-dom';
import { Code2, CheckCircle, Terminal, Cpu } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import ReturnButton from '../components/ReturnButton';

interface Challenge {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  difficulty: string;
  icon: LucideIcon;
}

const challenges: Record<number, Challenge[]> = {
  1: [
    {
      id: 1,
      title: 'Initialize System',
      description: 'Write a function that returns "Hello, World!"',
      completed: false,
      difficulty: 'Easy',
      icon: Terminal
    },
    {
      id: 2,
      title: 'Data Processing',
      description: 'Create a function that sums all numbers in an array',
      completed: false,
      difficulty: 'Easy',
      icon: Cpu
    },
    {
      id: 3,
      title: 'String Manipulation',
      description: 'Write a function that reverses a string',
      completed: false,
      difficulty: 'Easy',
      icon: Code2
    },
    {
      id: 4,
      title: 'Algorithm Analysis',
      description: 'Create a function that finds the maximum number in an array',
      completed: false,
      difficulty: 'Easy',
      icon: Terminal
    }
  ]
};

const Challenges = () => {
  const { roomId } = useParams();
  const roomChallenges = challenges[Number(roomId)] || [];
  const [selectedChallenge, setSelectedChallenge] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)] relative overflow-hidden">
      <ReturnButton />
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="matrix-code">
          {Array(100).fill('').map((_, i) => (
            <span key={i} className="text-green-500" style={{ animationDelay: `${Math.random() * 5}s` }}>
              {Math.random() > 0.5 ? '1' : '0'}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          Neural Training Modules
        </h1>
        <p className="text-center text-green-400 font-mono mb-12">
          // Select a module to begin training sequence
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {roomChallenges.map((challenge) => {
            const Icon = challenge.icon;
            return (
              <div
                key={challenge.id}
                className="group relative cursor-pointer"
                onClick={() => setSelectedChallenge(challenge.id)}
              >
                <div className={`
                  p-6 rounded-lg border-2 border-green-500/30 
                  bg-gray-800/50 backdrop-blur-xl
                  hover:bg-gray-800/70 transform transition-all duration-300 
                  hover:scale-105 ${selectedChallenge === challenge.id ? 'border-green-400' : ''}
                `}>
                  <div className="flex justify-between items-start mb-4">
                    <Icon className="text-green-400" size={24} />
                    {challenge.completed && (
                      <CheckCircle className="text-green-400" size={24} />
                    )}
                  </div>
                  
                  <h2 className="text-xl font-bold mb-2 text-white group-hover:text-green-400 transition-colors">
                    {challenge.title}
                  </h2>
                  
                  <p className="text-gray-300 mb-4 font-mono">{challenge.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-400 font-mono">Difficulty: {challenge.difficulty}</span>
                    <span className="text-sm text-gray-400 font-mono">
                      {challenge.completed ? 'Completed' : 'Not Started'}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300"
                      style={{ width: challenge.completed ? '100%' : '0%' }}
                    ></div>
                  </div>
                </div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Challenges;