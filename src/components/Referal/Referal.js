import React from 'react';
import styles from './Referal.module.css';

function Referal() {
  return (
    <div className={styles.referalContainer}>
      <div className={styles.referalMessage}>
        В данный момент реферальная система не доступна, но скоро она будет добавлена
      </div>
      <div className={styles.comingSoon}>Скоро!</div>
    </div>
  )
}

export default Referal;
