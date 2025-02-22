import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RoomSelection from './pages/RoomSelection';
import Challenges from './pages/Challenges';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<RoomSelection />} />
          <Route path="/room/:roomId/challenges" element={<Challenges />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;