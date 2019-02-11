import React from 'react';

import styles from './Details.scss';

const Details = ({ base_experience, height, id } ) => {
  const map = [
    {
      desc: 'Base Experience',
      value: base_experience
    },
    {
      desc: 'Height',
      value: height
    }
  ]

  return (      
    <div className={styles.wrapper}>
      <div className={styles.details}>
        {map.map((el, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.desc}>
              <h3 className={styles.description}>
                {el.desc}
              </h3>
            </div>
            <div className={styles.value}>
              {el.value}
            </div>
          </div>
        ))}          
      </div>
    </div>
  )
}


export default Details;
