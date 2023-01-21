module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: ['airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'eslint-plugin-import-helpers',
    'better-styled-components'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['./node_modules', './frontend', './server', './shared'],
      },
    },
  },
  rules: {
    "padding-line-between-statements": [
      "error",
      { blankLine: 'always', prev: '*', next: 'block' },
      { blankLine: 'always', prev: 'block', next: '*' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
    ],
    'no-mixed-operators': ['off'],
    '@typescript-eslint/no-unused-vars': ['off'],
    'no-restricted-globals': ['off'],
    'no-undef': ['off'],
    'consistent-return': ['off'],
    'no-plusplus': ['off'],
    'no-continue': ['off'],
    'no-empty-function': ['off'],
    'class-methods-use-this': ['off'],
    'func-names': ['off'],
    'no-useless-constructor': ['off'],
    'implicit-arrow-linebreak': 'off',
    'max-classes-per-file': ['off'],
    'no-underscore-dangle': ['off'],
    'no-param-reassign': ['off'],
    'max-len': ['error', { code: 120 }],
    'no-console': ['off'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'sort-imports': ['off'],
    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: [
          'absolute',
          'module',
          'parent',
          'sibling',
        ],
        alphabetize: {
          order: 'asc',
          ignoreCase: true,
        },
      },
    ],
    'import/no-unresolved': ['off'],
    'import/prefer-default-export': ['off'],
    'import/no-named-as-default': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    'import/extensions': ['off'],
    'import/no-cycle': [2, { maxDepth: 2 }],
    'import/no-duplicates': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/explicit-member-accessibility': ['error'],
      },
    },
  ],
};
