/// <reference types="vitest" />

import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import analyzer from 'rollup-plugin-analyzer'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  plugins: [
    vue(),
    analyzer({ summaryOnly: true }),
  ],
  test: {
    environment: 'happy-dom',
    setupFiles: './src/setupTests.ts',
    globals: true,
    snapshotFormat: {
      escapeString: false,
    },
    coverage: {
      enabled: true,
      provider: 'v8',
      include: [
        'src',
      ],
      exclude: [
        'src/*.{ts,vue}',
        'src/services/api.ts',
        'src/setupTests.ts',
        'src/utils/test',
        '**/*.d.ts',
      ],
      all: true,
    },
  },
})
