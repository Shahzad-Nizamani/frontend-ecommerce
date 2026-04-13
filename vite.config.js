import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://157.230.254.81:8001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/products': {
        target: 'http://157.230.254.81:8001',
        changeOrigin: true,
      },
      '/public': {
        target: 'http://157.230.254.81:8001',
        changeOrigin: true,
      },
    },
  },
});
