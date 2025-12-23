import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate recharts into its own chunk (large library)
          'recharts': ['recharts'],
          // Separate date-fns into its own chunk
          'date-fns': ['date-fns'],
          // Separate lucide-react icons into its own chunk
          'lucide-react': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
