import React from 'react';
import { hot } from 'react-hot-loader';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";


import Pokedex from '../Pokedex';
import Manage from '../Manage';

import './App.scss';
import '../../assets/images/favicon.png';

const client = new ApolloClient({
  link: createHttpLink({ uri: "/graphql" }),
  cache: new InMemoryCache()
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
