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
			['module:react-native-dotenv'],
			[
				'module-resolver',
				{
					root: ['.'],
					alias: {
						'@ctypes': './src/types',
						'@assets': './src/assets',
						'@components': './src/components',
						'@graphql': './src/graphql/',
						'@library': './src/library',
						'@context': './src/context',
						'@util': './src/util',
						'@helpers': './src/helpers',
						'@navigation': './src/navigation',
						'@constants': './src/constants',
						'@reactive': './src/reactive/index.tsx',
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
