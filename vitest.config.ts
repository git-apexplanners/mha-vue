import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [vue()],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
      include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
      exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        reportsDirectory: './coverage'
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
)
