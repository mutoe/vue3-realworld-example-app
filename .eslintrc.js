module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.app.json', './tsconfig.config.json', './tsconfig.cypress-ct.json'],
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  extends: [
    '@mutoe/eslint-config-preset-vue',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  overrides: [
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
