import React, { useState } from 'react';
import styles from './App.module.css';

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={incrementCount}>+1</button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1>Counter App</h1>
        <Counter />
      </div>
    </div>
  );
};

export default App;
