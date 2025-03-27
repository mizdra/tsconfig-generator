import cssModulesKit from '@css-modules-kit/eslint-plugin';
import css from '@eslint/css';
import mizdra from '@mizdra/eslint-config-mizdra';
import { defineConfig, globalIgnores } from 'eslint/config';
import reactCompiler from 'eslint-plugin-react-compiler';

export default defineConfig([
  globalIgnores(['**/dist', 'src/vite-env.d.ts', 'generated']),
  ...mizdra.baseConfigs,
  ...mizdra.typescriptConfigs,
  ...mizdra.nodeConfigs,
  { plugins: { 'react-compiler': reactCompiler } },
  {
    files: ['**/*.{js,jsx,mjs,cjs}', '**/*.{ts,tsx,cts,mts}'],
    rules: {
      'react-compiler/react-compiler': 'error',
    },
  },
  {
    files: ['**/*.css'],
    language: 'css/css',
    extends: [css.configs.recommended, cssModulesKit.configs.recommended],
  },
  mizdra.prettierConfig,
]);
