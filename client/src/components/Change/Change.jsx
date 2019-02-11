import React from 'react';
import { graphql } from 'react-apollo';
import getPokemonsQuery from '../../queries/queries';

import styles from './Change.scss';

class Change extends React.Component {

  state = {
    name: '',
    experience: '',
    height: '',
    image_url: '',
    isClicked: false,
    isActive: false
  }

  onClickHandler = () => {
    this.setState({
      isClicked: !this.state.isClicked,
    });   
  }

  onChooseHandler = (e) => {
    console.log("Click!!!");
    const { data: { pokemons }} = this.props;
    const name = e.target.dataset.name;
    console.log(name);
    const pokemon = pokemons.find(el => el.name === name);
    this.setState({
      name: pokemon.name,
      experience: pokemon.base_experience,
      height: pokemon.height,
      image_url: pokemon.image_url,
    });   
  }

  onLinkClickHandler = (e) => {
    const { data: { pokemons }} = this.props;
    const pokemon = pokemons.find(el => el.id === e.target.dataset.pokemonid);
    this.setState({
      isClicked: false,
      isActive: true,
      choosedPokemonID: pokemon.id,
      name: pokemon.name,
      experience: pokemon.base_experience,
      height: pokemon.height,
      image_url: pokemon.image_url,
    });   
  }

  render () {
    const { data: { pokemons }} = this.props;
    const { name, experience, height, image_url, isClicked, isActive, choosedPokemonID } = this.state;
    return (
      <div className={styles.wrapper}>
        <form>
          <h2>Choose Pokemon:</h2>
          <li className={styles.list_wrapper}>
            <button
              type="button"
              className={styles.link}
              onClick={this.onClickHandler}
            >
              {isActive ? pokemons.find(pokemon => pokemon.id === choosedPokemonID).name : 'Choose Pokemon'}
            </button>
            {isClicked && (
              <ul className={styles.list}>
                {pokemons.map(pokemon => (
                  <li key={pokemon.id} className={styles.item_wrapper}>
                    <button
                      type="button"
                      className={styles.item}
                      onClick={this.onLinkClickHandler}
                      data-pokemonid={pokemon.id}
                    >
                      {pokemon.name}
                    </button>
                  </li>
                ))}
              </ul>)}
          </li>
          <img src={image_url} />
          <h2>Change Name:</h2>
          <input type="text" name="base_expirience" placeholder="Enter name" value={name} onChange={this.onChangeHandler} />
          <h2>Change Base Experience:</h2>
          <input type="text" name="base_expirience" placeholder="Enter number" value={experience} onChange={this.onChangeHandler} />
          <h2>Change Height:</h2>
          <input type="text" name="height" placeholder="Enter number" value={height} onChange={this.onChangeHandler} />
          <h2>Change Image URL:</h2>
          <input type="text" name="height" placeholder="Enter number" value={image_url} onChange={this.onChangeHandler} />
          <button className={styles.button} type="submit">Change Pokemon</button>
        </form> 
      </div>
    )
  }
}
export default graphql(getPokemonsQuery)(Change);
