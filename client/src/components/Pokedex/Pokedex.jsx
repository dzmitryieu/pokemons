import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getPokemonsQuery } from '../../queries/queries';

import Pokemon from '../Pokemon';

import styles from './Pokedex.scss';

class Pokedex extends Component {
  
  render () {
    const { data } = this.props;
    if (data.loading){
      return (
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Pokemons are loading...</h2>
        </div>
      )
    } else {
      return (
        <div className={styles.wrapper}>
          <h2 className={styles.title}>List of All Pokemons</h2>
          <div className={styles.list}>
            { data.pokemons &&
              data.pokemons.map(pokemon => (
                <Pokemon key={pokemon.id} pokemon={pokemon} />           
              ))
            }        
          </div>
        </div>
      )
    }
  }
}

export default graphql(getPokemonsQuery)(Pokedex);
