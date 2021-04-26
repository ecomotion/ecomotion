import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class FlightForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    fetch('/api/')
      .then((res) => res.json())
      .then((codes) => {
        console.log(codes);
        return this.setState({
          codes: codes,
        });
      })
      .catch((err) => console.log('FlightForm ERROR: ', err));
  }

  //do I need to specify a form action in order to get this working?
  render() {
    return (
      <div className='form-container'>
        <form id='flight-info-form' onSubmit={() => this.props.onSubmit(event)}>
          <Autocomplete
            id='depField'
            freeSolo
            options={this.state.codes}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Departing From:'
                variant='outlined'
              />
            )}
          />
          <br></br>
          <Autocomplete
            id='arrField'
            freeSolo
            options={this.state.codes}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label='Arrving At:' variant='outlined' />
            )}
          />
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
