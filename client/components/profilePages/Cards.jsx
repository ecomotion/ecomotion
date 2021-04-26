import React from 'react';
import FlightHeading from './FlightHeading.jsx';
import ActionTypes from './ActionTypes.jsx';

export default function Cards() {
  return (
    <div className='cardStyling'>
      <FlightHeading />
      <ActionTypes />
    </div>
  );
}
