import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true
      },
      '/backend-inspector': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true
      },
      '/inspector': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true
      },
      '/admin': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
