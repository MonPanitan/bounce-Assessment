import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

//Importing pages
import HomePage from './home/page';
import AsteroidPage from './asteroid/page';
import EventPage from './events/page';
import PlanetPage from './planet/page';
import RoverPage from './rover/page';
import QuizesPage from './quiz/page';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/asteroid">Asteroids</Link>
        <Link to="/events">Events</Link>
        <Link to="/planet">Planets</Link>
        <Link to="/rover">Our Rovers</Link>
        <Link to="/quiz">Quizes</Link>

      </nav>

      <Routes>
        <Route path="/" element={<HomePage/>} />
        {/* Asteroids */}
        <Route path="/asteroid" element={<AsteroidPage />} />
        {/* Event */}
        <Route path="/events" element={<EventPage />} /> 
        {/* Planets */}
        <Route path="/planet" element={<PlanetPage />} />
        {/* Rovers */}
        <Route path="/quiz" element={<QuizesPage />} />
      {/* Quizes */}
        <Route path="/rover" element={<RoverPage />} />
      </Routes>
    </Router>
  );
}

export default App;
