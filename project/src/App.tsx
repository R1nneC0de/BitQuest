import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './contexts/SettingsContext';
import Home from './pages/Home';
import RoomSelection from './pages/RoomSelection';
import Challenges from './pages/Challenges';
import Settings from './pages/Settings';
import Manual from './pages/Manual';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <Router>
          <div className="min-h-screen bg-theme-primary text-theme-primary">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route 
                path="/rooms" 
                element={
                  <ProtectedRoute>
                    <RoomSelection />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/room/:roomId/challenges" 
                element={
                  <ProtectedRoute>
                    <Challenges />
                  </ProtectedRoute>
                } 
              />
              <Route path="/settings" element={<Settings />} />
              <Route path="/manual" element={<Manual />} />
            </Routes>
          </div>
        </Router>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;