import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

//see material UI documentation for lots more customization options for autocomplete info

class FlightForm extends React.Component {
  constructor(props) {
    super(props);
    //initializing state to grab input value
    this.state = {
      value: '',
    };
  }

  //grab airport data from airports table in SQL
  componentDidMount() {
    fetch('/api/')
      .then((res) => res.json())
      .then((airports) => {
        return this.setState({
          airports: airports,
        });
      })
      .catch((err) => console.log('FlightForm ERROR: ', err));
  }

  render() {
    return (
      <div className='form-container'>
        {/* this is for when someone hits search */}
        <form id='flight-info-form' onSubmit={() => this.props.onSubmit(event)}>
          {/* special mini component that material UI library provides (lines 35-57) */}
          <Autocomplete
            id='depField'
            freeSolo
            options={this.state.airports}
            style={{ width: 300, display: 'inline-block' }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Departing From:'
                variant='outlined'
              />
            )}
          />
          <span class='emoji-break'>➡️ ✈️ ➡️</span>
          <Autocomplete
            id='arrField'
            freeSolo
            options={this.state.airports}
            style={{ width: 300, display: 'inline-block' }}
            renderInput={(params) => (
              <TextField {...params} label='Arrving At:' variant='outlined' />
            )}
          />
          <div className='flight-options'>
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
          </div>
          {/* end of submission form */}
        </form>
      </div>
    );
  }
}

export default FlightForm;
