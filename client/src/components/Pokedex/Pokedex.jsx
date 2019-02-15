import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getPokemonsQuery, pokemonChangedSub } from '../../queries/queries';

import Pokemon from '../Pokemon';

import styles from './Pokedex.scss';

class Pokedex extends Component {

  componentDidMount () {
    const { getPokemonsQuery } = this.props;
    getPokemonsQuery.subscribeToMore({
      document: pokemonChangedSub,
      updateQuery: (prev, { subscriptionData }) => {
        console.log(prev, subscriptionData);
        if (!subscriptionData.data) return prev;
        const newPokemons = subscriptionData.data.pokemons;
        const result = Object.assign({}, {
          pokemons: [...newPokemons]
        });

        console.log('SPLIT', [...newPokemons, ...prev.pokemons]);
        console.log('RESULT', result);
        return result;
      }
    })
  }

  render () {
    const { getPokemonsQuery } = this.props;
    if (getPokemonsQuery.loading){
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
            { getPokemonsQuery.pokemons &&
              getPokemonsQuery.pokemons.map(pokemon => (
                <Pokemon key={pokemon.id} pokemon={pokemon} />           
              ))
            }        
          </div>
        </div>
      )
    }
  }
}

export default graphql(getPokemonsQuery, { name: 'getPokemonsQuery' })(Pokedex);
