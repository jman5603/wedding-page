import React from 'react';
import photo from '../couplephoto.jpg';
import '../styles/App.css';
import '../styles/Home.css';
import EditableLink from '../components/EditableLink';

const Home: React.FC = () => {
  return (
    <div className="App">
      <div className="App-header">
        <p className='title'>Juliette and Jacob</p>
        <p className='subtitle'>ARE GETTING MARRIED</p>
        <EditableLink to="/rsvp" text="RSVP" styleType='button' />
        <div className="App-links">
            <EditableLink to="/ourstory" text="Our Story" styleType='link' />
            <EditableLink to="/wedding" text="Wedding" styleType='link' />
            <EditableLink to="/registry" text="Registry" styleType='link' />
            <EditableLink to="/travel" text="Travel" styleType='link' />
        </div>
        <img src={photo} className="App-logo" alt="logo" />
        <p className='footer'>PLACEHOLDER 00, 2027</p>
        <p className='footer'>SAVE THE DATE</p>
      </div>
    </div>
  );
};

export default Home;
