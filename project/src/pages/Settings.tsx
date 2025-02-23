import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, ArrowLeft, Volume2, Monitor, Cpu } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import ReturnButton from '../components/ReturnButton';

const Settings = () => {
  const navigate = useNavigate();
  const {
    brightness,
    setBrightness,
    volume,
    setVolume,
    theme,
    setTheme,
    performance,
    setPerformance
  } = useSettings();

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)] p-8 relative">
      <ReturnButton />

      <div className="max-w-2xl mx-auto w-full space-y-8 mt-16">
        <h2 className="text-4xl font-bold text-[var(--accent-primary)] font-mono text-center mb-12">System Configuration</h2>

        <div className="space-y-6">
          <div className="bg-[var(--bg-secondary)]/50 p-6 rounded-lg border border-[var(--accent-primary)]/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Monitor className="text-[var(--accent-primary)]" />
                <span className="text-[var(--accent-primary)] font-mono">Display Brightness</span>
              </div>
              <span className="text-[var(--accent-primary)] font-mono">{brightness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full accent-[var(--accent-primary)] bg-[var(--bg-secondary)]/20"
            />
          </div>

          <div className="bg-[var(--bg-secondary)]/50 p-6 rounded-lg border border-[var(--accent-primary)]/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Volume2 className="text-[var(--accent-primary)]" />
                <span className="text-[var(--accent-primary)] font-mono">System Volume</span>
              </div>
              <span className="text-[var(--accent-primary)] font-mono">{volume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-[var(--accent-primary)] bg-[var(--bg-secondary)]/20"
            />
          </div>

          <div className="bg-[var(--bg-secondary)]/50 p-6 rounded-lg border border-[var(--accent-primary)]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <Moon className="text-[var(--accent-primary)]" /> : <Sun className="text-[var(--accent-primary)]" />}
                <span className="text-[var(--accent-primary)] font-mono">Interface Theme</span>
              </div>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as 'dark' | 'light' | 'matrix')}
                className="bg-[var(--bg-secondary)] text-[var(--accent-primary)] font-mono border border-[var(--accent-primary)]/30 rounded px-3 py-1"
              >
                <option value="dark">Dark Mode</option>
                <option value="light">Light Mode</option>
                <option value="matrix">Matrix Mode</option>
              </select>
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)]/50 p-6 rounded-lg border border-[var(--accent-primary)]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cpu className="text-[var(--accent-primary)]" />
                <span className="text-[var(--accent-primary)] font-mono">Performance Mode</span>
              </div>
              <select
                value={performance}
                onChange={(e) => setPerformance(e.target.value as 'high' | 'balanced' | 'power-save')}
                className="bg-[var(--bg-secondary)] text-[var(--accent-primary)] font-mono border border-[var(--accent-primary)]/30 rounded px-3 py-1"
              >
                <option value="high">High Performance</option>
                <option value="balanced">Balanced</option>
                <option value="power-save">Power Saver</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 