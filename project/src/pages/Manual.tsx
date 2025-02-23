import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Terminal, Brain, Shield, Code, Zap } from 'lucide-react';
import ReturnButton from '../components/ReturnButton';

const Manual = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)] p-8 relative">
      <ReturnButton />

      <div className="max-w-3xl mx-auto w-full space-y-8 mt-16">
        <h2 className="text-4xl font-bold text-cyan-400 font-mono text-center mb-12">System Manual</h2>

        <div className="space-y-6">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/30">
            <h3 className="text-2xl font-mono text-cyan-400 mb-4 flex items-center gap-3">
              <Terminal size={24} />
              Welcome to BitQuest
            </h3>
            <p className="text-gray-300 font-mono leading-relaxed">
              BitQuest is an immersive coding challenge platform designed to test and enhance your programming skills
              through a series of increasingly complex challenges. Navigate through different difficulty levels and
              prove your mastery of algorithms, data structures, and problem-solving.
            </p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/30">
            <h3 className="text-2xl font-mono text-cyan-400 mb-4 flex items-center gap-3">
              <Brain size={24} />
              Challenge Categories
            </h3>
            <ul className="space-y-4 text-gray-300 font-mono">
              <li className="flex items-center gap-3">
                <Code className="text-cyan-400" />
                <span>Algorithm Mastery: Optimize and solve complex algorithmic challenges</span>
              </li>
              <li className="flex items-center gap-3">
                <Shield className="text-cyan-400" />
                <span>Security Puzzles: Test your cybersecurity knowledge</span>
              </li>
              <li className="flex items-center gap-3">
                <Zap className="text-cyan-400" />
                <span>Speed Coding: Race against time to solve problems efficiently</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/30">
            <h3 className="text-2xl font-mono text-cyan-400 mb-4">Difficulty Levels</h3>
            <div className="space-y-2 font-mono">
              <p className="text-green-400">Level 1-3: Beginner - Basic programming concepts</p>
              <p className="text-yellow-400">Level 4-6: Intermediate - Advanced algorithms</p>
              <p className="text-orange-400">Level 7-9: Advanced - Complex problem-solving</p>
              <p className="text-red-400">Level 10: Expert - Master-level challenges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manual; 