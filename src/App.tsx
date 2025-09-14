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

// Stripe public key from environment variables
// Don't try to load Stripe when running under Cypress (tests) or if the key is missing.
const stripeKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const isCypress = typeof window !== 'undefined' && (window as any).Cypress;
const stripePromise = (!isCypress && stripeKey) ? loadStripe(stripeKey) : null;

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

// AuthWrapper returns children directly in development mode so routes are unprotected during local dev.
const AuthWrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  if (process.env.NODE_ENV === 'development') {
    return <>{children}</>;
  }
  return <RequireAuth>{children}</RequireAuth>;
};

function App() {
  const appearance = {
    theme: 'stripe' as const,
  };
  const loader = 'auto' as const;
  
  return (
    <Router>
      <NavBar />
      {stripePromise ? (
        <Elements options={{ appearance, loader }} stripe={stripePromise}>
          <Routes>
            <Route path="/" element={<AuthWrapper><Home /></AuthWrapper>} />
            <Route path="/ourstory" element={<AuthWrapper><OurStory /></AuthWrapper>} />
            <Route path="/wedding" element={<AuthWrapper><Wedding /></AuthWrapper>} />
            <Route path="/registry" element={<AuthWrapper><Registry /></AuthWrapper>} />
            <Route path="/travel" element={<AuthWrapper><Travel /></AuthWrapper>} />
            <Route path="/rsvp" element={<AuthWrapper><RSVP /></AuthWrapper>} />
            <Route path="/completion" element={<AuthWrapper><CompletionPage /></AuthWrapper>} />
            <Route path="/honeymoon-fund" element={<AuthWrapper><HoneymoonFund /></AuthWrapper>} />
          </Routes>
        </Elements>
      ) : (
        <Routes>
          <Route path="/" element={<AuthWrapper><Home /></AuthWrapper>} />
          <Route path="/ourstory" element={<AuthWrapper><OurStory /></AuthWrapper>} />
          <Route path="/wedding" element={<AuthWrapper><Wedding /></AuthWrapper>} />
          <Route path="/registry" element={<AuthWrapper><Registry /></AuthWrapper>} />
          <Route path="/travel" element={<AuthWrapper><Travel /></AuthWrapper>} />
          <Route path="/rsvp" element={<AuthWrapper><RSVP /></AuthWrapper>} />
          <Route path="/completion" element={<AuthWrapper><CompletionPage /></AuthWrapper>} />
          <Route path="/honeymoon-fund" element={<AuthWrapper><HoneymoonFund /></AuthWrapper>} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
