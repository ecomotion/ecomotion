import React, { Component } from 'react';

//creating a context using react context api
const MyContext = React.createContext();

//create a component MyProvider that will be used to access state in other components
class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          toggleLogIn: () =>
            this.setState(this.state.isLoggedIn ? false : true),
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
