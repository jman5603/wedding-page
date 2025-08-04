import React from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import EditableLink from '../components/EditableLink';

const Home: React.FC = () => {
  return (
    <div className="App">
      <div className="App-header">
        <p>Juliette and Jacob</p>
        <p>ARE GETTING MARRIED</p>
        <EditableLink to="/rsvp" text="RSVP" styleType='button' />
        <div className="App-links">
            <EditableLink to="/ourstory" text="Our Story" styleType='link' />
            <EditableLink to="/wedding" text="Wedding" styleType='link' />
            <EditableLink to="/registry" text="Registry" styleType='link' />
            <EditableLink to="/travel" text="Travel" styleType='link' />
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>PLACEHOLDER 00, 2027</p>
        <p>SAVE THE DATE</p>
      </div>
    </div>
  );
};

export default Home;
