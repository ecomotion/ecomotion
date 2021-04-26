import React, { Component } from 'react';

class ChoiceHolder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <a href='/auth/google'> Sign in with Google </a>
      </div>
    );
  }
}

export default ChoiceHolder;
