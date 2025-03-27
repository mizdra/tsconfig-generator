import { generateTSConfig, TSConfigPreference } from '../preference.js';

interface Props {
  preference: TSConfigPreference;
}

export function TSConfigViewer({ preference }: Props) {
  return <pre>{JSON.stringify(generateTSConfig(preference), null, 2)}</pre>;
}
