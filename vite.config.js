/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true, // automatically open the app in the browser on server start
    hot: true, // enables hot module replacement (HMR)
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/js/test/**/*.test.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    }
  },
  build: {
    outDir: 'dist',
  },
});
