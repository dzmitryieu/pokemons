import React from 'react';

import styles from './Add.scss';

const Add = () => (
  <div className={styles.wrapper}>
    <form>
      <h2>Name:</h2>
      <input type="text" name="name" defaultValue="Enter name" />
      <h2>Base Expirience:</h2>
      <input type="text" name="base_expirience" defaultValue="Enter number" />
      <h2>Height:</h2>
      <input type="text" name="height" defaultValue="Enter number" />
      <h2>Image URL:</h2>
      <input type="text" name="height" defaultValue="Enter URL" />
      <input className={styles.button} type="submit" value="Add Pokemon" />
    </form> 
  </div>
)

export default Add;
