import React, { Component, useEffect } from 'react';
import TripHeader from './TripHeader.jsx';
import TripCardsHolder from './TripCardsHolder.jsx';

function ProfileContainer() {
  useEffect(() => {
    console.log('did you mount?');
  }, []);

  return (
    <div>
      <div>WELCOME TO YOUR PROFILE</div>
      <div>
        <TripHeader />
        <TripCardsHolder />
      </div>
    </div>
  );
}

export default ProfileContainer;
