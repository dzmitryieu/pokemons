import React from 'react';
import { hot } from 'react-hot-loader';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Pokedex from '../Pokedex';
import Manage from '../Manage';

import './App.scss';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const App = () => (
  <ApolloProvider client={client}>
    <React.Fragment>
      <Pokedex />
      <Manage />
    </React.Fragment>
  </ApolloProvider>
);


export default hot(module)(App);
