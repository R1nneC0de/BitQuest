import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const ReturnButton = () => {
  const navigate = useNavigate();
  const { theme } = useSettings();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`
        absolute top-4 left-4 
        flex items-center gap-2 z-50
        text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]
        ${theme === 'matrix' ? 'bg-black/50 px-3 py-2 rounded-lg backdrop-blur-sm' : ''}
      `}
    >
      <ArrowLeft size={24} />
      <span className="font-mono">Return</span>
    </button>
  );
};

export default ReturnButton; 