import { useState } from 'react';
import styles from './App.module.css';
import { Form } from './components/Form.js';
import { TSConfigPreference } from './type.js';

export function App() {
  const [preference, setPreference] = useState<TSConfigPreference>({
    projectType: 'frontend-for-webapp',
    noUncheckedIndexedAccess: true,
    noImplicitReturns: true,
    noFallthroughCasesInSwitch: true,
    allowUnusedLabels: true,
    checkJs: true,
    allowUnreachableCode: false,
    noUnusedLocals: false,
    noUnusedParameters: false,
    exactOptionalPropertyTypes: false,
  });
  return (
    <div className={styles.container}>
      <h1>tsconfig.json generator for mizdra</h1>
      <div>
        <Form defaultValue={preference} onEdit={setPreference} />
      </div>
    </div>
  );
}
