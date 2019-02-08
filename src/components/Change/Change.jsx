import React from 'react';

import styles from './Change.scss';

class Change extends React.Component {

  state = {
    list: [],
  }

  componentDidMount () {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(response => response.json())
      .then(data => data.results.map(el => el.name))
      .then(data => this.setState({
        list: data
      }))      
  }

  render () {
    const { list } = this.state;
    return (
      <div className={styles.wrapper}>
        <form>
          <h2>Choose Pokemon:</h2>
          <select className={styles.list} type="text" name="name">
            {list && list.map(el => (
              <option key={el}>{el}</option>
            ))}
          </select>
          <h2>Change Name:</h2>
          <input type="text" name="base_expirience" defaultValue="Enter number" />
          <h2>Change Base Expirience:</h2>
          <input type="text" name="base_expirience" defaultValue="Enter number" />
          <h2>Change Height:</h2>
          <input type="text" name="height" defaultValue="Enter number" />
          <input className={styles.button} type="submit" value="Change Pokemon" />
        </form> 
      </div>
    )
  }
}
export default Change;
