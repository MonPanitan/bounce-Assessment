import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navBar"; // adjust path accordingly
import HomePage from "./home/page";
import AsteroidPage from "./asteroid/page";
import AstronomyPage from "./astronomy/page";
import RoverPage from "./rover/page";
import QuizesPage from "./quiz/page";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/asteroid" element={<AsteroidPage />} />
        <Route path="/astronomy" element={<AstronomyPage />} />
        <Route path="/rover" element={<RoverPage />} />
        <Route path="/quiz" element={<QuizesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
