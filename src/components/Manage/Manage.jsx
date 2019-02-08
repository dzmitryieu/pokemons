import React from 'react';

import Add from '../Add';
import Change from '../Change';

import styles from './Manage.scss';

const Manage = () => (
    <div className={styles.wrapper}>
      <Add />
      <Change />
    </div>
)

export default Manage;
