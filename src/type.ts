export interface TSConfigPreference {
  projectType: 'frontend-for-webapp' | 'backend-for-webapp' | 'npm-package';
  noUncheckedIndexedAccess: boolean;
  noImplicitReturns: boolean;
  noFallthroughCasesInSwitch: boolean;
  allowUnusedLabels: boolean;
  checkJs: boolean;
  allowUnreachableCode: boolean;
  noUnusedLocals: boolean;
  noUnusedParameters: boolean;
  exactOptionalPropertyTypes: boolean;
}
