import cssModulesKit from '@css-modules-kit/eslint-plugin';
import css from '@eslint/css';
import mizdra from '@mizdra/eslint-config-mizdra';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['**/dist', 'src/vite-env.d.ts', 'generated']),
  ...mizdra.baseConfigs,
  ...mizdra.typescriptConfigs,
  ...mizdra.nodeConfigs,
  {
    files: ['**/*.{js,jsx,mjs,cjs}', '**/*.{ts,tsx,cts,mts}'],
    rules: {
      // Write your favorite rules
    },
  },
  {
    files: ['**/*.css'],
    language: 'css/css',
    extends: [css.configs.recommended, cssModulesKit.configs.recommended],
  },
  mizdra.prettierConfig,
]);
