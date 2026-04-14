import defineConfig from '@mutoe/eslint-config'

export default defineConfig({
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
  vue: {
    sfcBlocks: {
      defaultLanguage: {
        script: 'ts',
      },
    },
  },
  rules: {
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'vue/block-order': 'off',
  },
  ignores: [
    'src/services/api.ts',
    '**/*.md',
  ],
}, {
  files: [
    '*.config.ts',
    'playwright/**/*',
  ],
  rules: {
    'node/prefer-global/process': 'off',
  },
})
