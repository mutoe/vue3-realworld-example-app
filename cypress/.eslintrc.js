module.exports = {
  root: true,
  env: {
    'cypress/globals': true,
  },
  extends: [
    '@mutoe/eslint-config-preset-basic',
    'plugin:cypress/recommended',
  ],
  rules: {
  },
}
