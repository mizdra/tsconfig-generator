import mizdra from '@mizdra/eslint-config-mizdra';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['**/dist', 'src/vite-env.d.ts'] },
  ...mizdra.baseConfigs,
  ...mizdra.typescriptConfigs,
  ...mizdra.nodeConfigs,
  {
    files: ['**/*.{js,jsx,mjs,cjs}', '**/*.{ts,tsx,cts,mts}'],
    rules: {
      // Write your favorite rules
    },
  },
  mizdra.prettierConfig,
];
