import React, { Component } from 'react';
import Cards from './Cards.jsx';

class TripCardsHolder extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>we're holding your cards here</div>
        <Cards />
      </div>
    );
  }
}

export default TripCardsHolder;
