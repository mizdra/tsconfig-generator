import jsonc from '@shikijs/langs/jsonc';
import githubLightHighContrast from '@shikijs/themes/github-light-high-contrast';
import { useEffect, useState } from 'react';
import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import styles from './CodeBlock.module.css';

interface Props {
  code: string;
}

export function CodeBlock({ code }: Props) {
  const [renderedHtml, setRenderedHtml] = useState<string | null>(null);

  useEffect(() => {
    createHighlighterCore({
      themes: [githubLightHighContrast],
      langs: [jsonc],
      engine: createOnigurumaEngine(import('shiki/wasm')),
    })
      .then((highlighter) => {
        const html = highlighter.codeToHtml(code, {
          lang: 'jsonc',
          theme: 'github-light-high-contrast',
        });
        setRenderedHtml(html);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Error generating HTML:', err);
      });
  }, [code]);

  return (
    <div className={styles.container}>
      {renderedHtml ?
        // eslint-disable-next-line @typescript-eslint/naming-convention
        <div className={styles.codeBlock} dangerouslySetInnerHTML={{ __html: renderedHtml }} />
      : 'Loading...'}
    </div>
  );
}
