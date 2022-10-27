import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import 'reset-css';
import './App.css';

import Game from 'pages/Game';
import GameOver from 'pages/GameOver';
import Index from 'pages/Index';
import PlayerSetup from 'pages/PlayerSetup';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/game" element={<Game />} />
        <Route path="/game-over" element={<GameOver />} />
        <Route path="/player-setup" element={<PlayerSetup />} />
        <Route path="/" element={<Index />} />
      </Routes>
    </Router>
  );
}
