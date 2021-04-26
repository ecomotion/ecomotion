import React, { Component } from 'react';
import Cards from './Cards.jsx';

class TripCardsHolder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const flightCards = [];
    for (let i = 0; i < this.props.profileData.length; i += 1) {
      console.log(
        'the data that will be pushed into the flightCard',
        this.props.profileData[i]
      );
      flightCards.push(<Cards profileData={this.props.profileData[i]}></Cards>);
    }
    return <div>{flightCards}</div>;
  }
}

export default TripCardsHolder;
