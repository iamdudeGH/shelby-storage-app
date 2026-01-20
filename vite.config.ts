import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    exclude: ['@shelby-protocol/sdk', '@shelby-protocol/react'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
    },
  },
  build: {
    target: 'esnext',
  },
})