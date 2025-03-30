export interface TSConfigPreference {
  projectType: 'frontend-for-webapp' | 'backend-for-webapp' | 'npm-package';
  allowUnreachableCode: boolean;
  allowUnusedLabels: boolean;
  checkJs: boolean;
  exactOptionalPropertyTypes: boolean;
  noFallthroughCasesInSwitch: boolean;
  noImplicitReturns: boolean;
  noUncheckedIndexedAccess: boolean;
  noUnusedLocals: boolean;
  noUnusedParameters: boolean;
}

export const defaultPreference: TSConfigPreference = {
  projectType: 'frontend-for-webapp',
  noUncheckedIndexedAccess: true,
  noImplicitReturns: true,
  noFallthroughCasesInSwitch: true,
  allowUnusedLabels: true,
  checkJs: true,
  allowUnreachableCode: false,
  noUnusedLocals: false,
  noUnusedParameters: false,
  exactOptionalPropertyTypes: false,
};

const typeCheckOptions = [
  'allowUnreachableCode',
  'allowUnusedLabels',
  'checkJs',
  'exactOptionalPropertyTypes',
  'noFallthroughCasesInSwitch',
  'noImplicitReturns',
  'noUncheckedIndexedAccess',
  'noUnusedLocals',
  'noUnusedParameters',
] as const;

export function encodePreferenceToURL(preference: TSConfigPreference): string {
  const params = new URLSearchParams();

  // If the value is not the default value, add it to the URL parameters

  if (preference.projectType !== defaultPreference.projectType) {
    params.set('projectType', preference.projectType);
  }
  for (const option of typeCheckOptions) {
    if (preference[option] !== defaultPreference[option]) {
      params.set(option, preference[option] ? 'true' : 'false');
    }
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
      result += '    "module": "esnext",\n';
      result += '    "moduleResolution": "bundler",\n';
      result += '    "noEmit": true,\n';
      break;
    case 'backend-for-webapp':
      result += '    "target": "esnext",\n';
      result += '    "module": "esnext",\n';
      result += '    "moduleResolution": "node",\n';
      result += '    "noEmit": true,\n';
      result += '    "allowImportingTsExtensions": true,\n';
      break;
    case 'npm-package':
      result += '    "target": "esnext",\n';
      result += '    "module": "esnext",\n';
      result += '    "moduleResolution": "node",\n';
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
  if (preference.allowUnreachableCode) result += '    "allowUnreachableCode": true,\n';
  if (preference.allowUnusedLabels) result += '    "allowUnusedLabels": true,\n';
  if (preference.checkJs) result += '    "checkJs": true,\n';
  if (preference.exactOptionalPropertyTypes) result += '    "exactOptionalPropertyTypes": true,\n';
  if (preference.noFallthroughCasesInSwitch) result += '    "noFallthroughCasesInSwitch": true,\n';
  if (preference.noImplicitReturns) result += '    "noImplicitReturns": true,\n';
  if (preference.noUncheckedIndexedAccess) result += '    "noUncheckedIndexedAccess": true,\n';
  if (preference.noUnusedLocals) result += '    "noUnusedLocals": true,\n';
  if (preference.noUnusedParameters) result += '    "noUnusedParameters": true,\n';
  result += '\n';
  result += '    /* Additional Options */\n';
  result += '    // ...\n';
  result += '  }\n';
  result += '}\n';
  return result;
}
