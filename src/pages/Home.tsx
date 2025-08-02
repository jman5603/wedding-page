import React from 'react';
import logo from '../logo.svg';
import '../styles/App.css';

const Home: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Jacob and Juliette's Wedding!
        </p>
        <img src={logo} className="App-logo" alt="logo" />
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
};

export default Home;
