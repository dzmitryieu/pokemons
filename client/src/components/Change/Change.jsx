import React from 'react';
import { graphql, compose } from 'react-apollo';
import { getPokemonsQuery, changePokemonMutation, deletePokemonMutation } from '../../queries/queries';

import styles from './Change.scss';

class Change extends React.Component {

  state = {
    id: '',
    name: '',
    base_experience: '',
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

  onChangeHandler = (e) => {
    this.setState({
      [e.target.dataset.name]: e.target.value
    });
  }

  onLinkClickHandler = (e) => {
    const { data: { pokemons }} = this.props;
    const pokemon = pokemons.find(el => el.id === e.target.dataset.pokemonid);
    this.setState({
      isClicked: false,
      isActive: true,
      id: pokemon.id,
      name: pokemon.name,
      base_experience: pokemon.base_experience,
      height: pokemon.height,
      image_url: pokemon.image_url,
    });   
  }


  onSubmitFormHandler = (e) => {
    e.preventDefault();
    const { id, name, base_experience, height, image_url } = this.state;
    const { changePokemonMutation } = this.props;
    if (e.target.name === 'change') {
      changePokemonMutation({
        variables: {
          pokemonid: {
            id: id,
            name: name,
            base_experience: base_experience,
            height: height,
            image_url: image_url
          }
        },
        refetchQueries: () => [{ query: getPokemonsQuery }]
      });
      this.setState({
        id: '',
        name: '',
        base_experience: '',
        height: '',
        image_url: '',
        isActive: false
      });
    }
  }

  render () {
    const { data: { pokemons }} = this.props;
    const { name, base_experience, height, image_url, isClicked, isActive, id } = this.state;
    return (
      <div className={styles.wrapper}>
        <form onSubmit={this.onSubmitFormHandler}>
          <h2>Choose Pokemon:</h2>
          <li className={styles.list_wrapper}>
            <button
              type="button"
              className={styles.link}
              onClick={this.onClickHandler}
            >
              {isActive ? pokemons.find(pokemon => pokemon.id === id).name : 'Choose Pokemon'}
            </button>
            {isClicked && (
              <ul className={styles.list}>
                {pokemons && pokemons.map(pokemon => (
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
          <input type="text" name="name" data-name="name" placeholder="Enter name" value={name} onChange={this.onChangeHandler} />
          <h2>Change Base Experience:</h2>
          <input type="text" name="base_experience" data-name="base_experience" placeholder="Enter number" value={base_experience} onChange={this.onChangeHandler} />
          <h2>Change Height:</h2>
          <input type="text" name="height" data-name="height" placeholder="Enter number" value={height} onChange={this.onChangeHandler} />
          <h2>Change Image URL:</h2>
          <input type="text" name="image_url" data-name="image_url" placeholder="Enter number" value={image_url} onChange={this.onChangeHandler} />
          <button className={styles.button} onClick={this.onSubmitFormHandler} name="change">Change Pokemon</button>
          <button className={styles.button} onClick={this.onSubmitFormHandler} name="delete">Delete Pokemon</button>
        </form> 
      </div>
    )
  }
}

export default compose(
  graphql(getPokemonsQuery),graphql(changePokemonMutation, { name: "changePokemonMutation" })
)(Change);
