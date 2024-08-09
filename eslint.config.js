import defineConfig from '@mutoe/eslint-config'

export default defineConfig({
  typescript: {
    tsconfigPath: [
      'tsconfig.json',
      'tsconfig.node.json',
      'cypress/e2e/tsconfig.json',
    ],
  },
  vue: {
    sfcBlocks: {
      defaultLanguage: {
        script: 'ts',
      },
    },
  },
  test: {
    vitest: true,
    cypress: true,
  },
  ignores: [
    'src/services/api.ts',
  ],
}, {
  files: ['cypress/support/**/*.ts'],
  rules: {
    'ts/method-signature-style': 'off',
  },
})
