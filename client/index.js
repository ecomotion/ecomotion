import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import './stylesheets/styles.css';

//linking our main App component to the 'root' element of the index.html through render keyword
render(<App />, document.getElementById('root'));
