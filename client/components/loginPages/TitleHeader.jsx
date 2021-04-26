import React, { Component } from 'react';

//render a component that will hold our title and our goals
export default function TitleHeader() {
  return (
    <div className='titleHeader'>
      <h1>ecomotion</h1>
      <em>
        your personal carbon offset calculator
      </em>
    </div>
  );
}
