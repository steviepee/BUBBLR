// import _ from 'lodash';

// const test = () => {
//   console.log('babel working?');
// };

// test();

// function component() {
//   const element = document.createElement('div');

//   // Lodash, currently included via a script, is required for this line to work
//   element.innerHTML = _.join(['WE WORKing', 'webpack'], ' ');

//   return element;
// }

// document.body.appendChild(component());
import React from 'react'
import App from './components/App';
import {createRoot} from 'react-dom/client'

document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<App />);

