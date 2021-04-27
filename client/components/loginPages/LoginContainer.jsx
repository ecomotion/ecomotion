import React, { Component } from 'react';
//import context into this component
import MyProvider from '.././context.js';
import ChoiceHolder from './ChoiceHolder.jsx';
import TitleHeader from './TitleHeader.jsx';

//this is our top component for the main login page

export default function LoginContainer() {
  return (
    <MyProvider>
      <div className='loginPageContainer'>
        <TitleHeader />
        <ChoiceHolder />
      </div>
    </MyProvider>
  );
}
