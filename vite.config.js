import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true, // automatically open the app in the browser on server start
    hot: true, // enables hot module replacement (HMR)
  },
  build: {
    outDir: 'dist',
  },
});
