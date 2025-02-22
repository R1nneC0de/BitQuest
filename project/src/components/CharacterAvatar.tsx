import React from 'react';
import { User, Cpu, Zap } from 'lucide-react';

const CharacterAvatar = () => {
  return (
    <div className="character-avatar fixed bottom-8 right-8 z-50">
      <div className="relative group">
        {/* Core Avatar */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-green-400 p-1 animate-pulse">
          <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center relative overflow-hidden">
            {/* Circulating Elements */}
            <div className="absolute inset-0">
              <Cpu className="absolute top-1 left-1 text-green-400 w-4 h-4 animate-spin-slow" />
              <Zap className="absolute bottom-1 right-1 text-blue-400 w-4 h-4 animate-pulse" />
            </div>
            
            {/* Central Icon */}
            <User className="text-green-400 w-10 h-10 relative z-10" />
            
            {/* Rotating Border */}
            <div className="absolute inset-0 border-2 border-green-400 rounded-full animate-spin-slow opacity-50" />
          </div>
        </div>

        {/* Pulse Effects */}
        <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-blue-500 opacity-30 blur-xl -z-10 group-hover:opacity-50 transition-opacity" />
        <div className="digital-pulse absolute -inset-4 bg-green-400" />
        
        {/* Status Indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse">
          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping" />
        </div>
      </div>

      {/* Level Indicator */}
      <div className="mt-2 text-center">
        <div className="text-green-400 text-sm font-mono">LVL 1</div>
        <div className="w-full h-1 bg-gray-800 rounded-full mt-1">
          <div className="w-1/4 h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CharacterAvatar;