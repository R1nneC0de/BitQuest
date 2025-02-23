import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await register(username, email, password);
      navigate('/rooms');
    } catch (error: any) {
      setError(error.response?.data?.error || 'Registration failed. Please try again.');
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)]">
      <div className="bg-gray-800/50 p-8 rounded-lg border border-[var(--accent-primary)]/30 w-96">
        <h2 className="text-2xl font-bold text-[var(--accent-primary)] text-center mb-6">Register for BitQuest</h2>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-3 bg-gray-900/50 border border-[var(--accent-primary)]/30 rounded text-white placeholder-gray-400"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 bg-gray-900/50 border border-[var(--accent-primary)]/30 rounded text-white placeholder-gray-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 bg-gray-900/50 border border-[var(--accent-primary)]/30 rounded text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="w-full p-3 bg-[var(--accent-primary)] text-white rounded hover:bg-[var(--accent-secondary)] transition-colors"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm; 