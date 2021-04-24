import React from 'react';
import FlightForm from './FlightForm.jsx'
import FlightOutput from './FlightOutput.jsx'

// BELOW ARE FOR REFERENCE ONLY; the const's don't seem to work with the API call
// const APIAddress= 'https://www.carboninterface.com/api/v1/estimates';
// const APIKey = 'Mtg90asNZIMTHndpW3YNFA';

class FlightInterface extends React.Component {
  constructor(props) {
    super(props);
  }


render() {
  return(
    <div className='flightInterface'>
      <FlightForm onSubmit={this.props.onSubmit} />
      <FlightOutput carbon={this.props.carbon} />
    </div>
  )
}

};

export default FlightInterface;