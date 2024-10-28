module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:react/recommended',
    'plugin:react-native-a11y/ios',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'lingui',
    'unused-imports',
    'simple-import-sort',
    'eslint-plugin-react-compiler',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    // Temporary until https://github.com/facebook/react-native/pull/43756 gets into a release.
    'prettier/prettier': 1,
    'react/no-unescaped-entities': 0,
    'react-native/no-inline-styles': 0,
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Node.js builtins prefixed with `node:`.
          ['^node:'],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          // React/React Native priortized, followed by expo
          // Followed by all packages excluding unprefixed relative ones
          [
            '^(react\\/(.*)$)|^(react$)|^(react-native(.*)$)',
            '^(expo(.*)$)|^(expo$)',
            '^(?!(?:alf|components|lib|locale|logger|platform|screens|state|view)(?:$|\\/))@?\\w',
          ],
          // Relative imports.
          // Ideally, anything that starts with a dot or #
          // due to unprefixed relative imports being used, we whitelist the relative paths we use
          // (?:$|\\/) matches end of string or /
          [
            '^(?:#\\/src)?(?:lib|state|logger|platform|locale)(?:$|\\/)',
            '^(?:#\\//src)?view(?:$|\\/)',
            '^(?:#\\//src)?screens(?:$|\\/)',
            '^(?:#\\//src)?alf(?:$|\\/)',
            '^(?:#\\//src)?components(?:$|\\/)',
            '^#\\/',
            '^\\.',
          ],
          // anything else - hopefully we don't have any of these
          ['^'],
        ],
      },
    ],

    // TODO: Reenable when we figure out why it gets stuck on CI.
    // 'react-compiler/react-compiler': 'error',
    'simple-import-sort/exports': 'error',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@atproto/api',
            importNames: ['moderatePost'],
            message:
              'Please use `moderatePost_wrapped` from `#/lib/moderatePost_wrapped` instead.',
          },
        ],
      },
    ],
  },
  ignorePatterns: [
    '**/__mocks__/*.ts',
    'src/platform/polyfills.ts',
    'src/third-party',
    'ios',
    'android',
    'coverage',
    '*.lock',
    '.husky',
    'patches',
    '*.html',
    'src/locale/locales/_build/',
    'src/locale/locales/**/*.js',
    'src/components/ui/**/*.tsx',
    'assets/theme/colors/*.{tsx,jsx,ts,js}',
    'scripts/**/*.{tsx,jsx,ts,js}',
    'graphql/generated/**/*.ts',
  ],
  settings: {
    componentWrapperFunctions: ['observer'],
  },
  overrides: [
    {
      // Target specific folders (e.g., "src/components" and "src/utils")
      files: ['./src/components/ui/**/*.tsx'],
      rules: {
        'react/display-name': 'off',
        'react/prop-types': 'off',
      },
    },
    {
      // Target specific folders (e.g., "src/components" and "src/utils")
      files: ['./app/**/*.tsx'],
      rules: {
        'simple-import-sort/exports': 'off',
        'react/display-name': 'off',
      },
    },
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
}
