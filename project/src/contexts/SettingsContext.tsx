import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  brightness: number;
  volume: number;
  theme: 'dark' | 'light' | 'matrix';
  performance: 'high' | 'balanced' | 'power-save';
  setBrightness: (value: number) => void;
  setVolume: (value: number) => void;
  setTheme: (value: 'dark' | 'light' | 'matrix') => void;
  setPerformance: (value: 'high' | 'balanced' | 'power-save') => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(80);
  const [theme, setTheme] = useState<'dark' | 'light' | 'matrix'>('dark');
  const [performance, setPerformance] = useState<'high' | 'balanced' | 'power-save'>('high');

  // Apply brightness effect
  useEffect(() => {
    document.documentElement.style.filter = `brightness(${brightness}%)`;
  }, [brightness]);

  // Apply theme effect
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-dark', 'theme-light', 'theme-matrix');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <SettingsContext.Provider
      value={{
        brightness,
        volume,
        theme,
        performance,
        setBrightness,
        setVolume,
        setTheme,
        setPerformance,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}; 