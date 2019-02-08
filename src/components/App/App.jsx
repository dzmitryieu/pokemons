import React from 'react';
import { hot } from 'react-hot-loader';

import Pokedex from '../Pokedex';
import Manage from '../Manage';

import './App.scss';

const App = () => (
  <React.Fragment>
    <Pokedex />
    <Manage />
  </React.Fragment>
);


export default hot(module)(App);
