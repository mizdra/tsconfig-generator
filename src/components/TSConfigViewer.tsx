import clsx from 'clsx';
import type { TSConfigPreference } from '../preference.js';
import { generateTSConfig } from '../preference.js';
import { CopyButton } from './CopyButton.js';
import styles from './TSConfigViewer.module.css';

interface Props {
  className?: string;
  preference: TSConfigPreference;
}

export function TSConfigViewer({ className, preference }: Props) {
  const tsconfig = generateTSConfig(preference);
  return (
    <div className={clsx(className, styles.wrapper)}>
      <pre>
        <code>{tsconfig}</code>
      </pre>
      <div className={styles.copyButton}>
        <CopyButton content={tsconfig} />
      </div>
    </div>
  );
}
