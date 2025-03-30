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
    <div>
      <header className={styles.header}>
        <div className={styles.title}>tsconfig.json generator for @mizdra</div>
        <div>
          <a href="https://github.com/mizdra/tsconfig-generator" target="_blank" rel="noopener">
            GitHub
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <TSConfigEditor preference={preference} onEdit={setPreference} />
        <TSConfigViewer className={styles.viewer} preference={preference} />
      </main>
      <footer className={styles.footer}>
        <p>
          Copyright (c) 2025{' '}
          <a href="https://github.com/mizdra" target="_blank" rel="noopener">
            mizdra
          </a>
        </p>
      </footer>
    </div>
  );
}
