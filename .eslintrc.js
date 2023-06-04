module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  env: {
    browser: true,
    node: true,
  },
  extends: ['@hiroxto', '@hiroxto/eslint-config/vue'],
  rules: {
    'no-undef': 'off',
    'vue/multi-word-component-names': 'off',
  },
};
