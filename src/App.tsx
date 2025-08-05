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
      <Link className='navbar-link' to="/">Home</Link>
      <Link className='navbar-link' to="/ourstory">Our Story</Link>
      <Link className='navbar-link' to="/wedding">Wedding</Link>
      <Link className='navbar-link' to="/registry">Registry</Link>
      <Link className='navbar-link' to="/travel">Travel</Link>
      <Link className='navbar-link' to="/rsvp">RSVP</Link>
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
