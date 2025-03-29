import type { TSConfigPreference } from '../preference.js';
import { generateTSConfig } from '../preference.js';
import { CopyButton } from './CopyButton.js';

interface Props {
  preference: TSConfigPreference;
}

export function TSConfigViewer({ preference }: Props) {
  const tsconfig = generateTSConfig(preference);
  return (
    <div>
      <pre>{tsconfig}</pre>
      <div>
        <CopyButton content={tsconfig} />
      </div>
    </div>
  );
}
