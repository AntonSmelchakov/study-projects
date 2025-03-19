import { defineConfig } from 'vite';

export default defineConfig({
  base: '',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
    target: 'esnext',
    outDir: './build',
  },
  server: {
    open: './src/index.html',
  },
  publicDir: './src/public',
});
