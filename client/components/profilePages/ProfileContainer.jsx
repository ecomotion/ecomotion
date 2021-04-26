import React, { Component, useEffect, useState } from 'react';
import TripHeader from './TripHeader.jsx';
import TripCardsHolder from './TripCardsHolder.jsx';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: [],
    };
  }

  componentDidMount() {
    console.log('profile container did mount');
    fetch('/api/loadProfile')
      .then((response) => {
        console.log('raw data', response);
        return response.json();
      })
      .then((profileDataResults) => {
        console.log('logging data call for profiles', profileDataResults);
        return this.setState({ profileData: profileDataResults.array_to_json });
      });
  }

  render() {
    return (
      <div>
        <div>MY SAVED TRIPS</div>
        <div>
          <TripHeader profileData={this.state.profileData} />
          <TripCardsHolder profileData={this.state.profileData} />
        </div>
      </div>
    );
  }
}

export default ProfileContainer;
