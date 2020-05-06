import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import citiesData from './common/data/cities.json';
import './index.css';
// import * as serviceWorker from './serviceWorker';

const cities = 
  citiesData.sort((city1, city2) => {
    const name1 = city1.name.toLowerCase();
    const name2 = city2.name.toLowerCase();
    return name1 !== name2 ? (name1 > name2 ? 1 : -1) : 0;
  });

ReactDOM.render(
  <React.StrictMode>
    <App cities={cities} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
