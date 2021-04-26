import React, { Component } from 'react';
//import context into this component
import MyProvider from '.././context.js';
import ChoiceHolder from './ChoiceHolder.jsx';
import TitleHeader from './TitleHeader.jsx';

export default function LoginContainer() {
  return (
    <MyProvider>
      <div>
        <p>Is anything rendering here?</p>
        <TitleHeader />
        <ChoiceHolder />
      </div>
    </MyProvider>
  );
}
