import React, { Component } from 'react';
import Cards from './Cards.jsx';

class TripCardsHolder extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='cardHolder'>
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
    );
  }
}

export default TripCardsHolder;
