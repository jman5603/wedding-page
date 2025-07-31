import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import OurStory from './pages/OurStory';
import Wedding from './pages/Wedding';
import Registry from './pages/Registry';
import Travel from './pages/Travel';
import logo from './logo.svg';
import './styles/App.css';

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
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/ourstory" element={<RequireAuth><OurStory /></RequireAuth>} />
        <Route path="/wedding" element={<RequireAuth><Wedding /></RequireAuth>} />
        <Route path="/registry" element={<RequireAuth><Registry /></RequireAuth>} />
        <Route path="/travel" element={<RequireAuth><Travel /></RequireAuth>} />
      </Routes>
    </Router>
  );
}

export default App;
