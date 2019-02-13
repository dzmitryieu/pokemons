import React from 'react';
import { graphql, compose } from 'react-apollo';

import { addPokemonMutation, getPokemonsQuery } from '../../queries/queries';

import styles from './Add.scss';

class Add extends React.Component {

  state = {
    name: '',
    base_experience: '',
    height: '',
    image_url: ''
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.dataset.name]: e.target.value
    });
  }

  onSubmitFormHandler = (e) => {
    e.preventDefault();
    const { name, base_experience, height, image_url } = this.state;
    const { addPokemonMutation } = this.props;
    addPokemonMutation({
      variables: {
        pokemon: {
          name: name,
          base_experience: base_experience,
          height: height,
          image_url: image_url
        }
      },
      refetchQueries: () => [{ query: getPokemonsQuery }]
    });
    this.setState({
      name: '',
      base_experience: '',
      height: '',
      image_url: ''
    });
  }

  render () {
    const { name, base_experience, height, image_url } = this.state;
    return (
      <div className={styles.wrapper}>
        <form>
          <h2>Name:</h2>
          <input type="text" name="name" data-name="name" placeholder="Enter name" value={name} onChange={this.onChangeHandler} />
          <h2>Base Experience:</h2>
          <input type="text" name="base_experience" data-name="base_experience" placeholder="Enter number" value={base_experience} onChange={this.onChangeHandler} />
          <h2>Height:</h2>
          <input type="text" name="height" data-name="height" placeholder="Enter number" value={height} onChange={this.onChangeHandler} />
          <h2>Image URL:</h2>
          <input type="text" name="image_url" data-name="image_url" placeholder="Enter URL" value={image_url} onChange={this.onChangeHandler} />
          <button onClick={this.onSubmitFormHandler} className={styles.button} type="submit">Add Pokemon</button>
        </form>
      </div>      
      )
    }
}

export default compose(
  graphql(addPokemonMutation, { name: "addPokemonMutation" })
)(Add);
