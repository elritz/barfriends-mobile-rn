module.exports = function (api) {
	api.cache(true)
	return {
		presets: [
			["babel-preset-expo",
				{
					jsxImportSource: "nativewind",
					jsxRuntime: 'automatic',
						// jsxImportSource: 'react',
        }
			],
			"nativewind/babel"
		],
		plugins: [
			// ['transform-remove-console'],
				[
				 'module:react-native-dotenv',
					{
						moduleName: '@env',
						path: '.env',
						safe: false,
						allowUndefined: true,
					},
			 	],

			[
				'module-resolver',
				{
					root: ['.'],
					alias: {
						'#/app': './app',
						'#/preferences': './types',
						'#/ctypes': './types',
						'#/assets': './assets',
						'#/util': './util',
						'#/components': './components',
						'#/helpers': './helpers',
						'#/screens': './screens',
						'#/graphql': './graphql/',
						'#/library': './library',
						'#/constants': './constants',
						'#/reactive': './reactive/index.tsx',
						'#/gluestack': './gluestack-ui.config',
					},
				},
			],
			"react-native-reanimated/plugin"
		],
	};
}
