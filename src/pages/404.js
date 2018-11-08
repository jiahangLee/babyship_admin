import React from 'react';
import styles from './index.css';

export default () => {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>***** 你想要干嘛？ *****</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
      </ul>
    </div>
  );
};
