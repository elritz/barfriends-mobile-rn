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
			require.resolve('expo-router/babel'),
			'module:react-native-dotenv',
			[
				'module-resolver',
				{
					root: ['.'],
					alias: {
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
			[
				'babel-plugin-styled-components',
				{
					pure: true,
				},
			],
			'react-native-reanimated/plugin',
		],
	}
}
