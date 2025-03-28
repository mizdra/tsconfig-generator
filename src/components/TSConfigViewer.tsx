import type { TSConfigPreference } from '../preference.js';
import { generateTSConfig } from '../preference.js';

interface Props {
  preference: TSConfigPreference;
}

export function TSConfigViewer({ preference }: Props) {
  return <pre>{generateTSConfig(preference)}</pre>;
}
