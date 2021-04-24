import React from 'react';
import FlightInterface from './FlightInterface.jsx';

const MainContainer = (props) => {
  return (
    <div className='container'>
      <div className='outerBox'>
        <div id='header-container'>
          <p id='header'>Placeholder TBD</p>
        </div>
        <FlightInterface />
      </div>
    </div>
  );
};

export default MainContainer;
