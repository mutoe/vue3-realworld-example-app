module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  extends: [
    '@mutoe/eslint-config-preset-vue',
  ],
  ignorePatterns: [
    'src/services/api.ts',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  overrides: [
    {
      files: ['src/composable/*.ts', 'src/**/use*.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    {
      files: [
        'src/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      ],
      extends: [
        'plugin:cypress/recommended',
      ],
      rules: {
        // `expect(true).to.be.true` is a valid expression
        'no-unused-expressions': 'off',
      },
    },
  ],
}
