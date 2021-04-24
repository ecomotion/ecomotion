import React from 'react';

class FlightForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='form-container'>
        <form id='flight-info-form' onSubmit={() => this.props.onSubmit(event)}>
          <label id='dep-label'>Departing from:</label>
          <input type='text' id='depField' name='depField'></input>
          <br></br>
          <label id='arr-label'>Arriving at:</label>
          <input type='text' id='arrField' name='arrField'></input>
          <br></br>
          <label id='pax-label'> Number of travelers:</label>
          <select id='paxField' name='paxField'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
          </select>
          <br></br>
          <label id='roundtrip-label'>Roundtrip?</label>
          <input type='radio' id='rtYes' name='rtYN' value='yes'></input>
          <label htmlFor='rtYes'>Yes</label>
          <input type='radio' id='rtNo' name='rtYN' value='no'></input>
          <label htmlFor='rtNo'>No</label>
          <br></br>
          <button id='submit' name='submit' type='submit'>
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default FlightForm;
