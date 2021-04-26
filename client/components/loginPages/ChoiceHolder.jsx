import React, { Component } from 'react';

class ChoiceHolder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='googleSign' id='customBtn'>
        <a href='/auth/google'><i class="fab fa-google"></i>Sign in with Google </a>
      </div>
    );
  }
}

export default ChoiceHolder;
