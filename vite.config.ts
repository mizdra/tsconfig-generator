import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const ReactCompilerConfig = {
  /* ... */
};

export default defineConfig({
  base: '/tsconfig-generator/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
  ],
  css: { lightningcss: { cssModules: { dashedIdents: true } } },
  build: { outDir: 'dist' },
});
