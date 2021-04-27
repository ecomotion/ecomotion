import React, { Component } from 'react';

//this is what's going to let us sign in through google. links us over
class ChoiceHolder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='googleSign' id='customBtn'>
        <a href='/auth/google'>
          <i className='fab fa-google'></i>Sign in with Google{' '}
        </a>
      </div>
    );
  }
}

export default ChoiceHolder;
