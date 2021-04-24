import React, { Component } from 'react';
// import MyContext from '../context.js';
// import { BrowserRouter as Router, Link } from 'react-router-dom';

class ChoiceHolder extends Component {
  constructor(props) {
    super(props);
    this.clickHandle = this.clickHandle.bind(this);
  }
  clickHandle() {
    fetch('/auth/google');
  }

  componentDidMount() {
    this.clickHandle();
  }
  render() {
    return (
      <div>
        <button onClick={this.clickHandle}>Log In</button>
      </div>
    );
  }
}

export default ChoiceHolder;
