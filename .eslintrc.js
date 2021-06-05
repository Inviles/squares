/* eslint-disable unicorn/prefer-module */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:unicorn/recommended',
    'plugin:compat/recommended',
    'plugin:react-perf/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-perf',
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['.'],
      },
    },
  },
  rules: {
    'max-len': ['error', { code: 120 }],
    'react/jsx-props-no-spreading': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/prefer-query-selector': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-null': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-shadow': ['error'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
