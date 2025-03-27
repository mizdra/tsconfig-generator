import React from 'react';
import styles from './App.module.css';
import { Form } from './components/Form.js';

export function App() {
  return (
    <div className={styles.container}>
      <div>
        <Form />
      </div>
    </div>
  );
}
