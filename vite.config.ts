/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url'
import { codecovVitePlugin } from '@codecov/vite-plugin'
import vue from '@vitejs/plugin-vue'
import analyzer from 'rollup-plugin-analyzer'
import { defineConfig } from 'vite'
import type { CoverageOptions } from 'vitest/node'
import mcrOptions from './config/mcr.unit.config'

const isTesting = process.env.NODE_ENV === 'testing'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  build: {
    sourcemap: isTesting,
  },
  plugins: [
    vue(),
    !isTesting && analyzer({ summaryOnly: true }),
    !isTesting && codecovVitePlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: 'vue3-realworld-example-app',
      uploadToken: process.env.CODECOV_TOKEN,
    }),
  ],
  test: {
    include: [
      'src/**/*.spec.ts',
    ],
    environment: 'happy-dom',
    setupFiles: './src/setup-tests.ts',
    globals: true,
    snapshotFormat: {
      escapeString: false,
    },
    coverage: {
      enabled: true,
      reportsDirectory: './coverage/unit',
      provider: 'custom',
      customProviderModule: 'vitest-monocart-coverage',
      coverageReportOptions: mcrOptions,
      include: [
        'src',
      ],
      exclude: [
        'src/services/api.ts',
        'src/setup-tests.ts',
        'src/utils/test',
        '**/*.d.ts',
      ],
      all: true,
    } as CoverageOptions,
  },
})
