const folders = (...args) => args.map((arg) => `**/${a}/**/*`);

module.exports = {
	plugins: [
		'react-perf',
		'@typescript-eslint',
		'@shopify',
		'import',
		'simple-import-sort',
		'sort-keys-fix',
		'prefer-arrow',	
		'react-memo',
		'prettier',
		'typescript-sort-keys',
		'typescript-enum'
	],
	parser: '@typescript-eslint/parser',
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			parserOptions: {
				project: './tsconfig.json',
			},
			rules: {
				'@typescript-eslint/await-thenable': 'error',
				'@typescript-eslint/no-floating-promises': 'error',
				'@typescript-eslint/naming-convention': require('./rules/naming-convention.js'),
			}
		},
		{
			files: ['*.tsx'],
			rules: {
				'react-memo/require-memo': 'error',
			}
		},
		{
			files: folders('types'),
			rules: {
				'@typescript-eslint/naming-convention': 'off',
			}
		},
		{
			files: ['*.json'],
			rules: {
				'max-len': 'off',
			}
		}
	],
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx']
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
			},
		},
		react: {
			version: 'detect',
		}
	},
	extends: [
		'@react-native-community',
		'plugin:react-perf/recommended',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-enum/recommended',
		'plugin:@prettier/recommended',
		'prettier',
	],
	ignorePatters: ['node_modules/'],
	rules: {
		'react/jsx-no-literals': [
			'error', 
			{
				ignoreProps: true,
				noStrings: true,
			}
		],
		complexity: ['error', 25],
		'max-nexted-callbacks': ['error', 4],
		'max-params': ['error', 3],
		'max-depth': ['error', 3],
		'max-len': ['error', 200],
		'max-lines': ['error', 300],
		'max-statements': ['error', 20],
		'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
		'react/jsx-key': ['error', { checkFragmentShorthand: true, checkKeyMustBefireSpread: true }],
		'@shopify/prefer-early-return': ['error', ],
		'react/jsx-boolean-value': ['error', 'never'],
		'no-unneeded-ternary': ['error', { defaultAssignment: false }],
		'object-shorthand': ['error', 'always'],
		'@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
		'typescript-sort-keys/interface': ['error', 'asc', { requiredFirst: true, caseSensitive: true, natural: false }],
		'no-useless-concat': 'error',
		'prefer-template': 'error',
		'no-loop-func': 'error',
		'@typescript-eslint/array-type': ['error', { default: 'array' }],
		'no-mixed-operators': [
			'error',
			{
				groups: [
					['&', '|', '^', '~', '<<', '>>', '>>>'],
					['==', '!=', '===', '!==', '>', '>=', '<', '<='],
					['&&', '||'],
					['in', 'instanceof'],
				],
			}
		],
		'require-await': 'error',
		'no-void': ['error', { allowAsStatement: true }],
		'prettier/prettier': 'error',
		'react-hooks/exhaustive-deps': [
			'error',
			{
				additionalHooks: 'useRecoilCallback',
			}
		],
		'@typescript-eslint/camelcase': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/prefer-optional-chain': 'error',

		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
		'import/no-cycle': ['error', { maxDepth: 4 }],
		'@shopify/no-acestor-directory-import': 'error',
		
		'no-extra-boolean-cast': 'error',
		'no-negated-condition': 'error',
		'no-param-reassign': ['error', {
			props: true,
			ignorePropertyModificationsFor: [`.*[Rr]ef`],
		}],
		'react-perf/jsx-no-new-array-as-prop': 'error',
		'react-perf/jsx-no-new-object-as-prop': 'error',
		'react-perf/jsx-no-new-function-as-prop': 'error',
		'react-memo/no-unstable-nested-components': 'error',

		'no-shadow': 'error',
		'no-catch-shadow': 'error',
		'no-warning-comments': 'warn',
		radix: ['error', 'as-needed'],
		'simple-import-sort/imports': ['error', {
			groups: [
				['^\\u0000'],
				['^react', '^@?\\w'],
				['^@/'],
			],
		}],
		'simple-import-sort/exports': 'error',
		'react-native/no-inline-styles': 'error',
		'prefer-arrow/prefer-arrow-functions': [
			'error',
			{
				disallowPrototype: true,
				singleReturnOnly: false,
				classPropertiesAllowed: false,
			}
		],
		'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
		'func-style': ['error', 'expression', { allowArrowFunctions: true }],
		'no-restricted-imports': [
			'error',
			{
				paths: [
					{ 
						name: 'react-native-webview', message: 'Please use the WebView component from @shopify/react-webview instead.'
					}
				]
			}
		]

	}
}