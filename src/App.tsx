import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import RequireAuth from './components/RequireAuth';
import OurStory from './pages/OurStory';
import Wedding from './pages/Wedding';
import Registry from './pages/Registry';
import RSVP from './pages/RSVP';
import Home from './pages/Home';
import Travel from './pages/Travel';
import CompletionPage from './pages/CompletionPage';
import HoneymoonFund from './pages/HoneymoonFund';
import EmailPage from './pages/EmailPage';

// Stripe public key from environment variables
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

const NavBar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  if (location.pathname === '/') return null;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link className='navbar-link' to="/" onClick={closeMenu}>Home</Link>
          <Link className='navbar-link' to="/ourstory" onClick={closeMenu}>Our Story</Link>
          <Link className='navbar-link' to="/wedding" onClick={closeMenu}>Wedding</Link>
          <Link className='navbar-link' to="/registry" onClick={closeMenu}>Registry</Link>
          <Link className='navbar-link' to="/travel" onClick={closeMenu}>Travel</Link>
          <Link className='navbar-link' to="/rsvp" onClick={closeMenu}>RSVP</Link>
        </div>

        {/* Overlay for mobile menu */}
        {isMenuOpen && <div className="navbar-overlay" onClick={closeMenu}></div>}
      </div>
    </nav>
  );
};

function App() {
  const appearance = {
    theme: 'stripe' as const,
  };
  const loader = 'auto' as const;
  
  return (
    <Router>
      <NavBar />
      <Elements options={{ appearance, loader }} stripe={stripePromise}>
        <Routes>
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/ourstory" element={<RequireAuth><OurStory /></RequireAuth>} />
          <Route path="/wedding" element={<RequireAuth><Wedding /></RequireAuth>} />
          <Route path="/registry" element={<RequireAuth><Registry /></RequireAuth>} />
          <Route path="/travel" element={<RequireAuth><Travel /></RequireAuth>} />
          <Route path="/rsvp" element={<RequireAuth><RSVP /></RequireAuth>} />
          <Route path="/completion" element={<RequireAuth><CompletionPage /></RequireAuth>} />
          <Route path="/honeymoon-fund" element={<RequireAuth><HoneymoonFund /></RequireAuth>} />
          <Route path="/send-guest-message" element={<RequireAuth><EmailPage /></RequireAuth>} />
        </Routes>
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ourstory" element={<OurStory />} />
          <Route path="/wedding" element={<Wedding />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/completion" element={<CompletionPage />} />
          <Route path="/honeymoon-fund" element={<HoneymoonFund />} />
        </Routes> */}
      </Elements>
    </Router>
  );
}

export default App;
