import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './contexts/SettingsContext';
import Home from './pages/Home';
import RoomSelection from './pages/RoomSelection';
import Challenges from './pages/Challenges';
import Settings from './pages/Settings';
import Manual from './pages/Manual';

function App() {
  return (
    <SettingsProvider>
      <Router>
        <div className="min-h-screen bg-theme-primary text-theme-primary">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<RoomSelection />} />
            <Route path="/room/:roomId/challenges" element={<Challenges />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/manual" element={<Manual />} />
          </Routes>
        </div>
      </Router>
    </SettingsProvider>
  );
}

export default App;