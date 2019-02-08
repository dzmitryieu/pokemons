import React, { Component } from 'react';

import Details from '../Details';

import styles from './Pokemon.scss';

class Pokemon extends Component {

  state = {
    imageURL: '',
    details: {
      base_experience: null,
      height: null,
      id: null
    },
    isShowDetails: false
  }
  
  componentDidMount () {
    const { pokemonURL } = this.props;
    fetch(pokemonURL)
      .then(response => response.json())
      .then(data => this.setState({
        imageURL: data.sprites.back_default,
        details: {
          base_experience: data.base_experience,
          height: data.height,
          id: data.id
        },
        isShowDetails: false
      }))
  }

  onClickHandler = () => {
    const { isShowDetails } = this.state;
    this.setState({
      isShowDetails: !isShowDetails
    });
  }

  render () {
    const { name } = this.props;
    const { 
      imageURL,
      details,      
      isShowDetails
    } = this.state;
    return (      
      <div className={styles.pokemon}>
        {imageURL && <img src={imageURL} />}
        <button onClick={this.onClickHandler} className={styles.name}>{name}</button>
        { isShowDetails && <Details details={details} /> }
      </div>
    )
  }
}


export default Pokemon;
