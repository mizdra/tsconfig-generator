import styles from './CopyButton.module.css';
import { useToast } from './Toast.js';

export function CopyButton({ content }: { content: string }) {
  const { showInfo, showError } = useToast();
  const handleCopy = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => showInfo('Copied!'))
      .catch((err) => showError(`Failed to copy: ${err}`));
  };

  return (
    <button className={styles.button} type="button" onClick={handleCopy}>
      Copy
    </button>
  );
}
