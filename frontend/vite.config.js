import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Pinned away from Vite's default 5173: another unrelated project on this
// machine permanently occupies that port, and strictPort makes a collision
// fail loudly instead of silently drifting to a random port that nothing
// else (CORS, bookmarks) expects.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,
    strictPort: true,
  },
})
