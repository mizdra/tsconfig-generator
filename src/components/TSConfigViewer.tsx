import { useId } from 'react';
import type { TSConfigPreference } from '../preference.js';
import { generateTSConfig } from '../preference.js';
import styles from './TSConfigViewer.module.css';

interface Props {
  preference: TSConfigPreference;
}

export function TSConfigViewer({ preference }: Props) {
  const id = useId();
  return (
    <div>
      <pre id={id}>{generateTSConfig(preference)}</pre>
      <clipboard-copy for={id} className={styles.copy}>
        Copy
      </clipboard-copy>
    </div>
  );
}
