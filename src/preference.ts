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

function filterUndefined<T extends object>(obj: T): object {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined)) as T;
}

function getOptionsFromProjectType(projectType: TSConfigPreference['projectType']): object {
  switch (projectType) {
    case 'frontend-for-webapp':
      return {
        target: 'esnext',
        module: 'preserve',
        moduleResolution: 'bundler',
        noEmit: true,
      };
    case 'backend-for-webapp':
      return {
        target: 'esnext',
        module: 'nodenext',
        moduleResolution: 'nodenext',
        noEmit: true,
        allowImportingTsExtensions: true,
      };
    case 'npm-package':
      return {
        target: 'es2021',
        module: 'nodenext',
        moduleResolution: 'nodenext',
        declaration: true,
        sourceMap: true,
        declarationMap: true,
        rootDir: 'src',
        outDir: 'dist',
      };
  }
}

export function generateTSConfig(preference: TSConfigPreference): object {
  return {
    compilerOptions: filterUndefined({
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      strict: true,
      skipLibCheck: true,
      erasableSyntaxOnly: true,
      verbatimModuleSyntax: true,
      ...getOptionsFromProjectType(preference.projectType),
      allowUnreachableCode: preference.allowUnreachableCode || undefined,
      allowUnusedLabels: preference.allowUnusedLabels || undefined,
      checkJs: preference.checkJs || undefined,
      exactOptionalPropertyTypes: preference.exactOptionalPropertyTypes || undefined,
      noFallthroughCasesInSwitch: preference.noFallthroughCasesInSwitch || undefined,
      noImplicitReturns: preference.noImplicitReturns || undefined,
      noUncheckedIndexedAccess: preference.noUncheckedIndexedAccess || undefined,
      noUnusedLocals: preference.noUnusedLocals || undefined,
      noUnusedParameters: preference.noUnusedParameters || undefined,
    }),
  };
}
