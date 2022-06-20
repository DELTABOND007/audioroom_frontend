import React from 'react';
import styles from './Card.module.css';
const Card = ({title,icon,children}) => {
  return(
    <div className={styles.card}>
    <div className={styles.headingWrapper}>
      {icon && <img src={`/images/${icon}.png`} alt="logo" />}
      {title && <h1 className={styles.heading}>{title}</h1>}
    </div>
    {children} {/* represents remaining items*/}

</div>
  )
};

export default Card;
