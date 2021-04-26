import React from 'react';

class FlightOutput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('in the flightOutput container');
    return (
      <div className='flightOutput'>
        <div>
          {this.props.carbon === 0
            ? ''
            : `Your flight will generate ${this.props.carbon}kg of CO2`}
        </div>
      </div>
    );
  }
}

export default FlightOutput;
