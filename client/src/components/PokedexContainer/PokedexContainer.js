import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo';
import { getPokemonsQuery } from '../../queries/queries';

import Pokedex from '../Pokedex';


const PokedexContainer = () => (

  <Query query={getPokemonsQuery}>
    {({ data, loading, error, subscribeToMore }) => {
      if (!data) {
        return null;
      }
      if (loading) {
        return <span>Loading ...</span>;
      }
      if (error) { 
        return <p>Sorry! Something went wrong.</p>;
      }
      return (<Pokedex
          data={data}
          subscribeToMore={subscribeToMore}
        />);
    }}
  </Query>
)

export default PokedexContainer;
