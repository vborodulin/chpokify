module.exports = {
  extends: '../.eslintrc.js',
  overrides: [
    {
      plugins: [
        'react',
        'eslint-plugin-react-hooks',
      ],
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'jsx-a11y/anchor-is-valid': ['error', {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        }],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'better-styled-components/sort-declarations-alphabetically': 2,
        'react/jsx-no-target-blank': ['off'],
        'react/boolean-prop-naming': ['error', { rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
        'react/no-unescaped-entities': ['off'],
        'react/no-danger': ['off'],
        'react/prop-types': ['off'],
        'react/destructuring-assignment': ['off'],
        'react/jsx-props-no-spreading': ['off'],
        'react/button-has-type': ['off'],
        'react/jsx-first-prop-new-line': ['error', 'always'],
        'react/jsx-filename-extension': [
          1,
          {
            extensions: ['.tsx'],
          },
        ],
        'react/react-in-jsx-scope': ['off'],
        'import-helpers/order-imports': [
          'error',
          {
            newlinesBetween: 'always',
            groups: [
              'absolute',
              'module',
              '/^@api/',
              '/^@config/',
              '/^@Redux/',
              '/^@components/domains/',
              '/^@components/pages/',
              '/^@components/layouts/',
              '/^@components/uiKit/',
              '/^@components/utils/',
              '/^@Next/',
              '/^@lib/',
              '/^@server/',
              '/^@styles/',
              '/^@helpers/',
              'parent',
              'sibling',
            ],
            alphabetize: {
              order: 'asc',
              ignoreCase: true,
            },
          },
        ],
      },
    },
  ],
};
