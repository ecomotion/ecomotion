import React from 'react';
import FlightInterface from './FlightInterface.jsx';
import MakeDifferenceContainer from './MakeDifferenceContainer.jsx';

class MainContainer extends React.Component {
  //creating our initial state
  constructor(props) {
    super(props);
    this.state = {
      flightInfo: {
        dep: 'xxx',
        arr: 'yyy',
        carbon: 0,
      },
      offsetActions: {
        trees: 1,
        meat: 1,
        bags: 1,
      },
    };

    //binding our onSubmit function to this component
    this.onSubmit = this.onSubmit.bind(this);
  }

  //event for when we click the search button
  onSubmit(event) {
    event.preventDefault();

    //this spliting is necessary in order for the API call to the carbon emissions to access the correct data
    //because of the autocomplete we're getting rid of the excess airport name and country and we're grabbing the first element of the array
    //the carbon api only wants the IATA code --> see full documentation https://docs.carboninterface.com/#/?id=getting-started
    const depArray = event.target.depField.value.split(',');
    const arrArray = event.target.arrField.value.split(',');
    const depCode = depArray[0];
    const arrCode = arrArray[0];
    // console.log("DEP CODE");
    // console.log(depCode);
    // console.log("ARR CODE");
    // console.log(arrCode);

    let carbonOutput = 0;

    //body creating for api call
    let bodyData = {
      type: 'flight',
      passengers: event.target.paxField.value,
      legs: [
        {
          departure_airport: depCode,
          destination_airport: arrCode,
        },
      ],
    };

    // adding logic to handle round-trip flights (adds an additional object to the legs array above)
    if (event.target.rtYN.value === 'yes')
      bodyData.legs.push({
        departure_airport: depCode,
        destination_airport: arrCode,
      });

    //this is our prepped header for our fetch request to api call
    const requestOptions = {
      method: 'POST',
      headers: {
        //this authorization is a require header for api
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
        //getting the proper data for carbon output from return object
        return (carbonOutput = response.data.attributes.carbon_kg);
      })
      .then((carbonOutput) => {
        this.setState({
          flightInfo: {
            dep: event.target.depField.value,
            arr: event.target.arrField.value,
            carbon: carbonOutput,
          },
        });
        console.log('state after query', this.state.flightInfo);
        //sending the information of our flight into our sql db - INSERT INTO
        const updateDatabase = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.state.flightInfo),
        };
        //working on posting the info to the database
        fetch('/api/newflight', updateDatabase)
          .then(() => console.log('sending flight data to database'))
          .catch((err) =>
            console.log('error sending flight data to database:', err)
          );
      });
  }

  render() {
    return (
      <div className='container'>
        <div className='outerBox'>
          <div id='header-container'>
            <h1>ecomotion</h1>
          </div>
          {/* passing onSubmit and carbon info */}
          <FlightInterface
            onSubmit={this.onSubmit}
            carbon={this.state.flightInfo.carbon}
          />
          {/* pass carbon flight info into this component and actions */}
          <MakeDifferenceContainer
            actions={this.state.offsetActions}
            carbon={this.state.flightInfo.carbon}
          />
        </div>
      </div>
    );
  }
}

export default MainContainer;
