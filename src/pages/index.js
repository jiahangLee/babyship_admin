import React from 'react';
import { connect } from 'dva';
import styles from './index.css';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>***** 正在建设! *****</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
