module.exports = function (api) {
	api.cache(true)
	return {
		presets: [
			[
				'babel-preset-expo',
				{
					jsxRuntime: 'automatic',
					jsxImportSource: 'react',
				},
			],
		],
		plugins: [
			// ['transform-remove-console'],
			'expo-router/babel',
			'module:react-native-dotenv',
			[
				'module-resolver',
				{
					root: ['.'],
					alias: {
						'@app': './app',
						'@ctypes': './types',
						'@assets': './assets',
						'@components': './components',
						'@graphql': './graphql/',
						'@library': './library',
						'@context': './context',
						'@util': './util',
						'@helpers': './helpers',
						'@screens': './screens',
						'@constants': './constants',
						'@reactive': './reactive/index.tsx',
					},
				},
			],
			'react-native-reanimated/plugin',
		],
	}
}
