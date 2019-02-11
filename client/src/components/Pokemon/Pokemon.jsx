import React, { Component } from 'react';

import Details from '../Details';

import styles from './Pokemon.scss';

class Pokemon extends Component {

  state = {
    isShowDetails: false
  }
  
  onClickHandler = () => {
    const { isShowDetails } = this.state;
    this.setState({
      isShowDetails: !isShowDetails
    });
  }

  render () {
    const { 
      pokemon: {
        image_url,
        id,
        name,
        base_experience,
        height      
      }
    } = this.props;
    const { isShowDetails } = this.state;
    return (      
      <div className={styles.pokemon}>
        {image_url && <img src={image_url} />}
        <button onClick={this.onClickHandler} className={styles.name}>{name}</button>
        { 
          isShowDetails 
          && <Details 
                base_experience={base_experience}
                height={height}
              /> 
        }
      </div>
    )
  }
}


export default Pokemon;
