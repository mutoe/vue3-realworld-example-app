module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@mutoe/eslint-config-preset-ts',
    'plugin:cypress/recommended',
  ],
  env: {
    'cypress/globals': true,
  },
  overrides: [
    {
      files: ['support/**/*.ts'],
      rules: {
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/consistent-type-imports': 'error',
      },
    },
  ],
}
