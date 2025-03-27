import React from 'react';
import styles from './App.module.css';
import { Form } from './components/Form.js';

export function App() {
  return (
    <div className={styles.container}>
      <h1>tsconfig.json generator for mizdra</h1>
      <div>
        <Form />
      </div>
    </div>
  );
}
