import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {fixupConfigRules, fixupPluginRules} from '@eslint/compat'
import {FlatCompat} from '@eslint/eslintrc'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import lingui from 'eslint-plugin-lingui'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactNative from 'eslint-plugin-react-native'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: [
      '**/__mocks__/*.ts',
      'src/platform/polyfills.ts',
      'src/third-party',
      '**/ios',
      '**/android',
      '**/coverage',
      '**/*.lock',
      '**/.husky',
      '**/patches',
      '**/*.html',
      'src/locale/locales/_build/',
      'src/locale/locales/**/*.js',
      'src/components/ui/**/*.tsx',
      'assets/theme/colors/*.\\{tsx,jsx,ts,js}',
      'scripts/**/*.\\{tsx,jsx,ts,js}',
      'graphql/generated/**/*.ts',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      // '@react-native-community',
      // 'eslint:recommended',
      // 'plugin:react/recommended',
      // 'plugin:react-native-a11y/ios',
      'plugin:react-native/all',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
    ),
  ),
  {
    plugins: {
      react: fixupPluginRules(react),
      'react-hooks': fixupPluginRules(reactHooks),
      'react-native': fixupPluginRules(reactNative),
      lingui,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
      // 'react-compiler': reactCompiler,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      componentWrapperFunctions: ['observer'],
      react: {
        version: 'detect',
      },
    },

    rules: {
      'no-shadow': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'prettier/prettier': 1,
      'react/no-unescaped-entities': 0,
      // 'react-native/no-inline-styles': 'warn',
      'react-native/no-inline-styles': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^node:'],
            [
              '^(react\\/(.*)$)|^(react$)|^(react-native(.*)$)',
              '^(expo(.*)$)|^(expo$)',
              '^(?!(?:alf|components|lib|locale|logger|platform|screens|state|view)(?:$|\\/))@?\\w',
            ],
            [
              '^(?:#\\/src)?(?:lib|state|logger|platform|locale)(?:$|\\/)',
              '^(?:#\\//src)?view(?:$|\\/)',
              '^(?:#\\//src)?screens(?:$|\\/)',
              '^(?:#\\//src)?alf(?:$|\\/)',
              '^(?:#\\//src)?components(?:$|\\/)',
              '^#\\/',
              '^\\.',
            ],
            ['^'],
          ],
        },
      ],

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

      'unused-imports/no-unused-imports': 'error',

      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      'react/prop-types': 'off',
      'react-native/no-color-literals': 'off',
      'react-native/sort-styles': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-native/no-raw-text': [
        'error',
        {
          skip: ['Text', 'Heading', 'ButtonText'],
        },
      ],
      // this rule needs to be deleted, temp 2024
      'react/no-unstable-nested-components': 'off',
    },
  },
  {
    files: ['./app/**/*.{ts,tsx,js,jsx}'],
    rules: {
      'simple-import-sort/exports': 'off',
      'react/display-name': 'off',
      'react-hooks/rules-of-hooks': 'off',
    },
  },
  {
    files: ['./src/components/ui/**/*.tsx'],
    rules: {
      'react/display-name': 'off',
      'react/prop-types': 'off',
    },
  },
  {
    files: ['./assets/theme/colors/**/*.js'],
    rules: {
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'no-void': 'off',
    },
  },
]
