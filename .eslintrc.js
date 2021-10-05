module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    jquery: true,
  },
  extends: ['eslint:recommended', 'plugin:unicorn/recommended'],
  rules: {
    //  eslint-plugin-unicorn
    'unicorn/no-null': 0,
    'unicorn/no-useless-undefined': 0,
    'unicorn/prefer-module': 0,
    'unicorn/prevent-abbreviations': 0,
    'unicorn/prefer-node-protocol': 0,
    'unicorn/import-style': [
      2,
      {
        styles: {
          path: {
            named: true,
          },
        },
      },
    ],
    'unicorn/consistent-destructuring': 0,
    'unicorn/no-array-reduce': 0,
    'unicorn/no-nested-ternary': 0,
  },
};
