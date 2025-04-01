export interface TSConfigPreference {
  projectType: 'frontend-for-webapp' | 'backend-for-webapp' | 'npm-package';
  checkJs: boolean;
  noUnusedLocals: boolean;
  noUnusedParameters: boolean;
  exactOptionalPropertyTypes: boolean;
  noImplicitReturns: boolean;
  noFallthroughCasesInSwitch: boolean;
  noUncheckedIndexedAccess: boolean;
  allowUnusedLabels: boolean;
  allowUnreachableCode: boolean;
}

export const defaultPreference: TSConfigPreference = {
  projectType: 'frontend-for-webapp',
  checkJs: true,
  noUnusedLocals: false,
  noUnusedParameters: false,
  exactOptionalPropertyTypes: false,
  noImplicitReturns: true,
  noFallthroughCasesInSwitch: true,
  noUncheckedIndexedAccess: true,
  allowUnusedLabels: true,
  allowUnreachableCode: true,
};

const typeCheckOptions = [
  'checkJs',
  'noUnusedLocals',
  'noUnusedParameters',
  'exactOptionalPropertyTypes',
  'noImplicitReturns',
  'noFallthroughCasesInSwitch',
  'noUncheckedIndexedAccess',
  'allowUnusedLabels',
  'allowUnreachableCode',
] as const;

export function encodePreferenceToURL(preference: TSConfigPreference): string {
  const params = new URLSearchParams();

  params.set('projectType', preference.projectType);
  for (const option of typeCheckOptions) {
    params.set(option, preference[option] ? 'true' : 'false');
  }

  const url = new URL(window.location.href);
  url.search = params.toString();
  return url.toString();
}

export function decodePreferenceFromURL(): TSConfigPreference | null {
  const params = new URLSearchParams(window.location.search);
  const result = { ...defaultPreference };

  const projectType = params.get('projectType');
  if (
    projectType !== null &&
    (projectType === 'frontend-for-webapp' || projectType === 'backend-for-webapp' || projectType === 'npm-package')
  ) {
    result.projectType = projectType;
  }
  for (const option of typeCheckOptions) {
    if (params.has(option)) {
      result[option] = params.get(option) === 'true';
    }
  }

  return result;
}

export function generateTSConfig(preference: TSConfigPreference): string {
  let result = '{\n';
  result += '  "compilerOptions": {\n';
  result += '    /* Basic */\n';
  result += '    "esModuleInterop": true,\n';
  result += '    "forceConsistentCasingInFileNames": true,\n';
  result += '    "strict": true,\n';
  result += '    "skipLibCheck": true,\n';
  result += '    "erasableSyntaxOnly": true,\n';
  result += '    "verbatimModuleSyntax": true,\n';
  result += '\n';
  result += '    /* Projects */\n';
  switch (preference.projectType) {
    case 'frontend-for-webapp':
      result += '    "target": "esnext",\n';
      result += '    "module": "preserve",\n';
      // result += '    "moduleResolution": "bundler",\n'; // auto-set
      result += '    "noEmit": true,\n';
      result += '    "lib": ["esnext", "dom.iterable", "DOM.AsyncIterable"],\n';
      result += '    "jsx": "preserve",\n';
      break;
    case 'backend-for-webapp':
      result += '    "target": "esnext",\n';
      result += '    "module": "nodenext",\n';
      // result += '    "moduleResolution": "nodenext",\n'; // auto-set
      result += '    "noEmit": true,\n';
      result += '    "allowImportingTsExtensions": true,\n';
      break;
    case 'npm-package':
      result += '    "target": "es2021",\n';
      result += '    "module": "nodenext",\n';
      // result += '    "moduleResolution": "nodenext",\n'; // auto-set
      result += '    "noEmit": false,\n';
      result += '    "allowImportingTsExtensions": true,\n';
      result += '    "declaration": true,\n';
      result += '    "sourceMap": true,\n';
      result += '    "declarationMap": true,\n';
      result += '    "rootDir": "src",\n';
      result += '    "outDir": "dist",\n';
      break;
    default:
      break;
  }
  result += '\n';
  result += '    /* Type Checking */\n';
  if (preference.checkJs) result += '    "checkJs": true,\n';
  if (preference.noUnusedLocals) result += '    "noUnusedLocals": true,\n';
  if (preference.noUnusedParameters) result += '    "noUnusedParameters": true,\n';
  if (preference.exactOptionalPropertyTypes) result += '    "exactOptionalPropertyTypes": true,\n';
  if (preference.noImplicitReturns) result += '    "noImplicitReturns": true,\n';
  if (preference.noFallthroughCasesInSwitch) result += '    "noFallthroughCasesInSwitch": true,\n';
  if (preference.noUncheckedIndexedAccess) result += '    "noUncheckedIndexedAccess": true,\n';
  if (preference.allowUnusedLabels) result += '    "allowUnusedLabels": true,\n';
  if (preference.allowUnreachableCode) result += '    "allowUnreachableCode": true,\n';
  result += '  }\n';
  result += '}\n';
  return result;
}
