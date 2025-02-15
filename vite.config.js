import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Sets the base URL for the app
  plugins: [react()], // Adds support for React and JSX
  optimizeDeps: {
    include: ['react', 'react-dom'], // Ensures dependencies are pre-bundled
  },
  resolve: {
    alias: {
      // Shortens import paths if necessary
      '@': '/src',
    },
  },
});