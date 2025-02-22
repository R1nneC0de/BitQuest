import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Settings, HelpCircle } from 'lucide-react';
import MatrixBackground from '../components/MatrixBackground';
import CircuitLines from '../components/CircuitLines';
import CharacterAvatar from '../components/CharacterAvatar';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-800 to-gray-900 p-4 relative overflow-hidden">
      <div className="cyber-grid" />
      <MatrixBackground />
      <CircuitLines />
      <CharacterAvatar />
      
      <div className="relative z-10 text-center space-y-12">
        <div className="space-y-4">
          <div className="relative">
            <h1 className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-green-400 animate-pulse">
              BitQuest
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 opacity-30 blur-xl -z-10"></div>
          </div>
          <p className="text-green-400 text-lg font-mono">System Status: Online</p>
        </div>
        
        <div className="flex flex-col gap-6 w-80 mx-auto">
          <button
            onClick={() => navigate('/rooms')}
            className="group relative px-8 py-4 bg-transparent border-2 border-green-500 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            <div className="relative flex items-center justify-center gap-3">
              <Terminal className="text-green-400" size={24} />
              <span className="text-xl font-mono text-green-400">Initialize</span>
            </div>
            <div className="absolute inset-0 border-2 border-green-400/50 rounded-lg"></div>
          </button>

          <button className="group relative px-8 py-4 bg-transparent border-2 border-blue-500 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            <div className="relative flex items-center justify-center gap-3">
              <Settings className="text-blue-400" size={24} />
              <span className="text-xl font-mono text-blue-400">Configure</span>
            </div>
            <div className="absolute inset-0 border-2 border-blue-400/50 rounded-lg"></div>
          </button>

          <button className="group relative px-8 py-4 bg-transparent border-2 border-cyan-500 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-green-500/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            <div className="relative flex items-center justify-center gap-3">
              <HelpCircle className="text-cyan-400" size={24} />
              <span className="text-xl font-mono text-cyan-400">Manual</span>
            </div>
            <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-lg"></div>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 w-full">
        <div className="h-1 bg-gradient-to-r from-green-500 via-blue-500 to-green-500 animate-pulse"></div>
        <div className="h-8 bg-gradient-to-t from-green-500/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default Home;