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

export function generateTSConfig(preference: TSConfigPreference): string {
  let result = '{\n';
  result += '  "compilerOptions": {\n';
  result += '    "esModuleInterop": true,\n';
  result += '    "forceConsistentCasingInFileNames": true,\n';
  result += '    "strict": true,\n';
  result += '    "skipLibCheck": true,\n';
  result += '    "erasableSyntaxOnly": true,\n';
  result += '    "verbatimModuleSyntax": true,\n';
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
  if (preference.allowUnreachableCode) result += '    "allowUnreachableCode": true,\n';
  if (preference.allowUnusedLabels) result += '    "allowUnusedLabels": true,\n';
  if (preference.checkJs) result += '    "checkJs": true,\n';
  if (preference.exactOptionalPropertyTypes) result += '    "exactOptionalPropertyTypes": true,\n';
  if (preference.noFallthroughCasesInSwitch) result += '    "noFallthroughCasesInSwitch": true,\n';
  if (preference.noImplicitReturns) result += '    "noImplicitReturns": true,\n';
  if (preference.noUncheckedIndexedAccess) result += '    "noUncheckedIndexedAccess": true,\n';
  if (preference.noUnusedLocals) result += '    "noUnusedLocals": true,\n';
  if (preference.noUnusedParameters) result += '    "noUnusedParameters": true,\n';
  result += '  }\n';
  result += '}\n';
  return result;
}
