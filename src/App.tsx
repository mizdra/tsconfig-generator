import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { TSConfigEditor } from './components/TSConfigEditor.js';
import { TSConfigViewer } from './components/TSConfigViewer.js';
import type { TSConfigPreference } from './preference.js';
import { decodePreferenceFromURL, defaultPreference, encodePreferenceToURL } from './preference.js';

export function App() {
  const [preference, setPreference] = useState<TSConfigPreference>(defaultPreference);

  useEffect(() => {
    const preferenceFromURL = decodePreferenceFromURL();
    if (preferenceFromURL) {
      setPreference(preferenceFromURL);
    }
  }, []);

  const handleShare = () => {
    const url = encodePreferenceToURL(preference);

    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert('URL copied to clipboard');
      })
      .catch(() => {
        alert('Failed to copy URL');
      });
  };

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
        <TSConfigEditor preference={preference} onEdit={setPreference} onShare={handleShare} />
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
