import React from 'react';

import styles from './Add.scss';

const Add = () => (
  <div className={styles.wrapper}>
    <form>
      <h2>Name:</h2>
      <input type="text" name="name" placeholder="Enter name" />
      <h2>Base Experience:</h2>
      <input type="text" name="base_expirience" placeholder="Enter number" />
      <h2>Height:</h2>
      <input type="text" name="height" placeholder="Enter number" />
      <h2>Image URL:</h2>
      <input type="text" name="height" placeholder="Enter URL" />
      <button className={styles.button} type="submit">Add Pokemon</button>
    </form> 
  </div>
)

export default Add;
