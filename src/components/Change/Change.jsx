import React from 'react';

import styles from './Change.scss';

class Change extends React.Component {

  state = {
    list: [],
    name: '',
    experience: '',
    height: '',
  }

  componentDidMount () {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(response => response.json())
      .then(data => this.setState({
        list: data.results
      }))      
  }

  onClickHandler = (e) => {
    console.log("Click!!!");
    const { list } = this.state;
    const name = e.target.dataset.name;
    console.log(name);
    const pokemon = list.find(el => el.name === name);
    fetch(pokemon.url)
      .then(response => response.json())
      .then(data => this.setState({
        name: name,
        experience: data.base_experience,
        height: data.height,
      }))   
  }

  render () {
    const { 
      list,
      name,
      experience,
      height
     } = this.state;
    return (
      <div className={styles.wrapper}>
        <form>
          <h2>Choose Pokemon:</h2>
          <select className={styles.list} type="text" name="name">
            {list && list.map(el => (
              <option 
                key={el.name} 
                onClick={this.onClickHandler}
                data-name={el.name}
              >
                {el.name}
              </option>
            ))}
          </select>
          <h2>Change Name:</h2>
          <input type="text" name="base_expirience" placeholder="Enter name" value={name} onChange={this.onChangeHandler} />
          <h2>Change Base Expirience:</h2>
          <input type="text" name="base_expirience" placeholder="Enter number" value={experience} onChange={this.onChangeHandler} />
          <h2>Change Height:</h2>
          <input type="text" name="height" placeholder="Enter number" value={height} onChange={this.onChangeHandler} />
          <button className={styles.button} type="submit">Change Pokemon</button>
        </form> 
      </div>
    )
  }
}
export default Change;
