import '@github/clipboard-copy-element';
import { useState } from 'react';
import styles from './App.module.css';
import { TSConfigEditor } from './components/TSConfigEditor.js';
import { TSConfigViewer } from './components/TSConfigViewer.js';
import type { TSConfigPreference } from './preference.js';

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
      <h1>tsconfig.json generator for @mizdra</h1>
      <main className={styles.column}>
        <TSConfigEditor defaultValue={preference} onEdit={setPreference} />
        <TSConfigViewer preference={preference} />
      </main>
    </div>
  );
}
