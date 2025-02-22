import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Unlock, Cpu, Shield, Coins, Heart } from 'lucide-react';
import CircuitLines from '../components/CircuitLines';
import CharacterAvatar from '../components/CharacterAvatar';

const rooms = [
  {
    id: 1,
    name: 'Initialization Chamber',
    description: 'Basic Coding Challenges',
    unlocked: true,
    theme: 'from-green-500 to-green-700',
    Icon: Cpu,
  },
  {
    id: 2,
    name: 'Security Vault',
    description: 'Cybersecurity Challenges',
    unlocked: false,
    theme: 'from-blue-500 to-blue-700',
    Icon: Shield,
  },
  {
    id: 3,
    name: 'FinTech Hub',
    description: 'Financial Technology Challenges',
    unlocked: false,
    theme: 'from-purple-500 to-purple-700',
    Icon: Coins,
  },
  {
    id: 4,
    name: 'MedTech Lab',
    description: 'Healthcare Coding Challenges',
    unlocked: false,
    theme: 'from-red-500 to-red-700',
    Icon: Heart,
  }
];

const RoomSelection = () => {
  const navigate = useNavigate();
  const [hoveredRoom, setHoveredRoom] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="cyber-grid" />
      <CircuitLines />
      <CharacterAvatar />

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm z-20 py-4 border-b border-green-500/20">
        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 relative">
          Neural Network Map
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 opacity-30 blur-xl -z-10"></div>
        </h1>
      </div>

      {/* Main Content - Centered */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="relative max-w-6xl w-full py-20">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ minHeight: '300px' }}>
            {rooms.slice(0, -1).map((room, index) => (
              <g key={room.id}>
                <line
                  x1={`${20 + (index * 30)}%`}
                  y1="50%"
                  x2={`${40 + (index * 30)}%`}
                  y2="50%"
                  stroke={room.unlocked ? '#4ade80' : '#1f2937'}
                  strokeWidth="2"
                  className="connection-line"
                />
                <circle
                  cx={`${30 + (index * 30)}%`}
                  cy="50%"
                  r="4"
                  fill={room.unlocked ? '#4ade80' : '#1f2937'}
                  className="animate-pulse"
                />
              </g>
            ))}
          </svg>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {rooms.map((room) => {
              const Icon = room.Icon;
              return (
                <div
                  key={room.id}
                  className={`
                    relative group
                    ${room.unlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'}
                    transform transition-all duration-300 hover:scale-105
                  `}
                  onClick={() => room.unlocked && navigate(`/room/${room.id}/challenges`)}
                >
                  <div className={`
                    p-6 rounded-lg border-2 border-opacity-50 
                    bg-gray-800/50 backdrop-blur-xl
                    ${room.unlocked ? 'border-green-500' : 'border-gray-600'}
                    relative z-10
                  `}>
                    <div className="flex justify-between items-start mb-4">
                      <Icon className={`w-8 h-8 ${room.unlocked ? 'text-green-400' : 'text-gray-400'}`} />
                      {room.unlocked ? (
                        <Unlock className="text-green-400" size={20} />
                      ) : (
                        <Lock className="text-gray-400" size={20} />
                      )}
                    </div>
                    <h2 className="text-xl font-bold mb-2 text-white">{room.name}</h2>
                    <p className="text-gray-300 text-sm">{room.description}</p>
                    
                    {/* Status Indicator */}
                    <div className="mt-4 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${room.unlocked ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`}></div>
                      <span className="text-sm text-gray-400">
                        {room.unlocked ? 'System Access Granted' : 'Access Restricted'}
                      </span>
                    </div>

                    {/* Circuit Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                      <div className="circuit-lines"></div>
                    </div>
                  </div>
                  
                  {/* Enhanced Glow Effect */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-r ${room.theme} 
                    opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300
                  `}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSelection;