import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const vercelOrigin = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';

export default defineConfig({
  base: process.env.VITE_BASE || '/',
  define: {
    'import.meta.env.VITE_VERCEL_ORIGIN': JSON.stringify(vercelOrigin),
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/@stripe')) return 'vendor-stripe';
          if (id.includes('node_modules/@supabase')) return 'vendor-supabase';
          if (id.includes('node_modules/framer-motion')) return 'vendor-motion';
          if (id.includes('node_modules/react') || id.includes('node_modules/react-router')) {
            return 'vendor-react';
          }
          return undefined;
        },
      },
    },
  },
  server: {
    port: 5175,
    host: true,
    strictPort: true,
  },
});

