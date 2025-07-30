import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OurStory from './OurStory';
import Wedding from './Wedding';
import Registry from './Registry';
import Travel from './Travel';
import logo from './logo.svg';
import './App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Jacob and Juliette's Wedding!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/ourstory">Our Story</Link>
        <Link to="/wedding">Wedding</Link>
        <Link to="/registry">Registry</Link>
        <Link to="/travel">Travel</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ourstory" element={<OurStory />} />
        <Route path="/wedding" element={<Wedding />} />
        <Route path="/registry" element={<Registry />} />
        <Route path="/travel" element={<Travel />} />
      </Routes>
    </Router>
  );
}

export default App;
