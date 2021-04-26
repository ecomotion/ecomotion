import React, { Component } from 'react';
import TripHeader from './TripHeader.jsx';
import TripCardsHolder from './TripCardsHolder.jsx';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
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
}

export default ProfileContainer;
