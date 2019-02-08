import React, { Component } from 'react';

import Pokemon from '../Pokemon';

import styles from './Pokedex.scss';

class Pokedex extends Component {
  state = {
    list: [],
  }

  componentDidMount () {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(response => response.json())
      .then(data => this.setState({
        list: data.results
      }))
  }

  render () {
    const { list } = this.state;
    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>List of All Pokemons</h2>
        <div className={styles.list}>
          {
            list && list.map(pokemon => (
              <Pokemon key={pokemon.name} pokemonURL={pokemon.url} name={pokemon.name} />           
            ))
          }        
        </div>
      </div>
    )
  }
}


export default Pokedex;
