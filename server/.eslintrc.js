module.exports = {
  "extends": "../.eslintrc.js",
  "overrides": [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'import/no-mutable-exports': ['off'],
        'import-helpers/order-imports': [
          'error',
          {
            newlinesBetween: 'always',
            groups: [
              'absolute',
              'module',
              '/^@auth/',
              '/^@core/',
              '/^@mail/',
              '/^@metrics/',
              '/^@models/',
              '/^@routes/',
              '/^@spaces/',
              '/^@stats/',
              '/^@users/',
              'parent',
              'sibling',
            ],
            alphabetize: {
              order: 'asc',
              ignoreCase: true,
            },
          },
        ]
      },
    }
  ]
}
