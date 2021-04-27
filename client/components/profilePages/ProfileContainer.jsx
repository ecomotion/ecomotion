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
    //fetching the info from flights table in sql db.
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

  //send profile data to child components
  render() {
    return (
      <div className='profileContainer'>
        <div className='nav'>My Saved Trips</div>
        <div className='gallery'>
          <TripHeader profileData={this.state.profileData} />
          <TripCardsHolder profileData={this.state.profileData} />
        </div>
      </div>
    );
  }
}

export default ProfileContainer;
