import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 必须和仓库名一致，前后都要有斜杠
  base: '/cot-yard/',
})
