import defineConfig from '@mutoe/eslint-config'

export default defineConfig({
  typescript: {
    tsconfigPath: 'tsconfig.json',
    ignoresTypeAware: [
      'cypress/**',
      '**/*.cy.ts',
    ],
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
  },
  ignores: [
    'src/services/api.ts',
  ],
}, {
  files: ['cypress/support/**/*.ts'],
  rules: {
    'ts/method-signature-style': 'off',
  },
}, {
  files: [
    '*.config.ts',
    'playwright/**/*',
  ],
  rules: {
    'node/prefer-global/process': 'off',
  },
})
