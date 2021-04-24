import React from 'react';
import FlightForm from './FlightForm.jsx';

// BELOW ARE FOR REFERENCE ONLY; the const's don't seem to work with the API call
// const APIAddress= 'https://www.carboninterface.com/api/v1/estimates';
// const APIKey = 'Mtg90asNZIMTHndpW3YNFA';

class FlightInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const bodyData = {
      type: 'flight',
      passengers: event.target.paxField.value,
      legs: [
        {
          departure_airport: event.target.depField.value,
          destination_airport: event.target.arrField.value,
        },
      ],
    };

    console.log('bodyData', bodyData);

    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer Mtg90asNZIMTHndpW3YNFA',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    };

    fetch('https://www.carboninterface.com/api/v1/estimates', requestOptions)
      .then((response) => {
        console.log('raw response', response);
        return response.json();
      })
      .then((response) => {
        console.log('full data obj', response);
        console.log('emissions estimates', response.data.attributes);
      });
  }

  render() {
    return (
      <div className='flightInterface'>
        <FlightForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default FlightInterface;
