import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // 리액트 런타임을 따로 떼어 캐시되게 하고, 초기 청크를 작게 유지한다
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('d3-') || id.includes('react-simple-maps') || id.includes('topojson')) return 'map'
        },
      },
    },
  },
})
