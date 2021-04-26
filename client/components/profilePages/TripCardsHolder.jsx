import React, { Component } from 'react';
import Cards from './Cards.jsx';

class TripCardsHolder extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const flightCards = [];
    for (let i = 0; i < this.props.profileData.length; i += 1) {
      flightCards.push(<Cards profileData={this.props.profileData[i]}></Cards>);
    }
    return (
      <div>
        <div>we're holding your cards here</div>
        {flightCards}
      </div>
    );
  }
}

export default TripCardsHolder;
