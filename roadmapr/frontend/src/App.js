import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreatePath from './pages/CreatePath';
import RoadmapView from './pages/RoadmapView';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-path" element={<CreatePath />} />
            <Route path="/roadmap/:id" element={<RoadmapView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
