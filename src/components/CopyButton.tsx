import { useRef, useState } from 'react';
import styles from './CopyButton.module.css';

export function CopyButton({ content }: { content: string }) {
  const [tooltipText, setTooltipText] = useState('');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const handleCopy = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setTooltipText('Copied!');
        tooltipRef.current?.showPopover();
      })
      .catch((err) => {
        setTooltipText(`Failed to copy: ${err}`);
        tooltipRef.current?.showPopover();
      });
  };

  return (
    <>
      <button className={styles.button} type="button" onClick={handleCopy}>
        Copy
      </button>
      {/* MEMO: Not sure if `role=tooltip` is best (ref: https://blog.jxck.io/entries/2024-11-01/tooltip-popover.html#apg) */}
      <div ref={tooltipRef} role="tooltip" popover="auto" aria-live="assertive" className={styles.tooltip}>
        {tooltipText}
      </div>
    </>
  );
}
