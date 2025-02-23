import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Settings, HelpCircle } from 'lucide-react';
import MatrixBackground from '../components/MatrixBackground';
import CircuitLines from '../components/CircuitLines';
import CharacterAvatar from '../components/CharacterAvatar';
import { useSettings } from '../contexts/SettingsContext';

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useSettings();

  const getButtonBgClass = () => {
    if (theme === 'matrix') {
      return 'bg-black/80 backdrop-blur-sm';
    }
    return 'bg-[var(--bg-secondary)]/80';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)] p-4 relative overflow-hidden">
      <div className="cyber-grid" />
      {theme === 'matrix' && <MatrixBackground />}
      <CircuitLines />
      <CharacterAvatar />
      
      <div className="relative z-10 text-center space-y-12">
        <div className="relative">
          <h1 className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-secondary)] via-[var(--accent-primary)] to-[var(--accent-secondary)]">
            BitQuest
          </h1>
          <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-primary)] opacity-30 blur-xl -z-10"></div>
        </div>
        
        <div className="flex flex-col gap-6 w-80 mx-auto">
          <button
            onClick={() => navigate('/rooms')}
            className={`group relative px-8 py-4 ${getButtonBgClass()} border-2 border-[var(--accent-secondary)] rounded-lg overflow-hidden hover:scale-105 transition-all duration-300`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-secondary)]/20 to-[var(--accent-primary)]/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            <div className="relative flex items-center justify-center gap-3">
              <Terminal className="text-[var(--accent-secondary)]" size={24} />
              <span className="text-xl font-mono text-[var(--accent-secondary)]">Initialize</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/settings')}
            className={`group relative px-8 py-4 ${getButtonBgClass()} border-2 border-[var(--accent-primary)] rounded-lg overflow-hidden hover:scale-105 transition-all duration-300`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            <div className="relative flex items-center justify-center gap-3">
              <Settings className="text-[var(--accent-primary)]" size={24} />
              <span className="text-xl font-mono text-[var(--accent-primary)]">Configure</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/manual')}
            className={`group relative px-8 py-4 ${getButtonBgClass()} border-2 border-[var(--accent-secondary)] rounded-lg overflow-hidden hover:scale-105 transition-all duration-300`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-secondary)]/20 to-[var(--accent-primary)]/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            <div className="relative flex items-center justify-center gap-3">
              <HelpCircle className="text-[var(--accent-secondary)]" size={24} />
              <span className="text-xl font-mono text-[var(--accent-secondary)]">Manual</span>
            </div>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 w-full">
        <div className="h-1 bg-gradient-to-r from-[var(--accent-secondary)] via-[var(--accent-primary)] to-[var(--accent-secondary)]"></div>
        <div className="h-8 bg-gradient-to-t from-[var(--accent-secondary)]/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default Home;