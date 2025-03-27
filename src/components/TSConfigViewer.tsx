import { TSConfigPreference } from '../type.js';

interface Props {
  preference: TSConfigPreference;
}

export function TSConfigViewer({ preference }: Props) {
  return <pre>{JSON.stringify(preference, null, 2)}</pre>;
}
