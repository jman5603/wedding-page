import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';
import OurStory from './pages/OurStory';
import Wedding from './pages/Wedding';
import Registry from './pages/Registry';
import RSVP from './pages/RSVP';
import Home from './pages/Home';
import Travel from './pages/Travel';


const NavBar: React.FC = () => {
  const location = useLocation();
  if (location.pathname === '/') return null;
  return (
    <nav className="App" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', padding: '1rem' }}>
      <Link to="/">Home</Link>
      <Link to="/ourstory">Our Story</Link>
      <Link to="/wedding">Wedding</Link>
      <Link to="/registry">Registry</Link>
      <Link to="/travel">Travel</Link>
      <Link to="/rsvp">RSVP</Link>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/ourstory" element={<RequireAuth><OurStory /></RequireAuth>} />
        <Route path="/wedding" element={<RequireAuth><Wedding /></RequireAuth>} />
        <Route path="/registry" element={<RequireAuth><Registry /></RequireAuth>} />
        <Route path="/travel" element={<RequireAuth><Travel /></RequireAuth>} />
        <Route path="/rsvp" element={<RequireAuth><RSVP /></RequireAuth>} />
      </Routes>
    </Router>
  );
}

export default App;
