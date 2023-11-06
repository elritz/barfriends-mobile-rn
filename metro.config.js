const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

config.transformer.minifierPath = 'metro-minify-esbuild'
config.transformer.minifierConfig = {
	// You can automatically remove console.log statements using the following configuration:
	// drop: ['console'],
}

config.resolver.assetExts.push('db')

module.exports = config
