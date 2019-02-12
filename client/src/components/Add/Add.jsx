import React from 'react';
import { graphql, compose } from 'react-apollo';

import { addPokemonMutation, getPokemonsQuery } from '../../queries/queries';

import styles from './Add.scss';

class Add extends React.Component {

  state = {
    name: '',
    base_experience: null,
    height: null,
    image_url: ''
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.dataset.name]: e.target.value
    });
  }

  onSubmitFormHandler = () => {
    const { name, base_experience, height, image_url } = this.state;
    const { addPokemonMutation, getPokemonsQuery } = this.props;
    e.preventDefault();
    addPokemonMutation({
      variables: {
        name: name,
        base_experience: base_experience,
        height: height,
        image_url: image_url
      },
      refetchQueries: [{ query: getPokemonsQuery }]
    });
  }

  render () {
    return (
      <div className={styles.wrapper}>
        <form onSubmit={this.onSubmitFormHandler}>
          <h2>Name:</h2>
          <input type="text" name="name" data-name="name" placeholder="Enter name" onChange={this.onChangeHandler} />
          <h2>Base Experience:</h2>
          <input type="text" name="base_experience" data-name="base_experience" placeholder="Enter number" onChange={this.onChangeHandler} />
          <h2>Height:</h2>
          <input type="text" name="height" data-name="height" placeholder="Enter number" onChange={this.onChangeHandler} />
          <h2>Image URL:</h2>
          <input type="text" name="image_url" data-name="image_url" placeholder="Enter URL" onChange={this.onChangeHandler} />
          <button className={styles.button} type="submit">Add Pokemon</button>
        </form> 
      </div>
    )
  }
}

export default compose(
  graphql(addPokemonMutation, { name: "addPokemonMutation" }),
  graphql(getPokemonsQuery, { name: "getPokemonsQuery" })
)(Add);
