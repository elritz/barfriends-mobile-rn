const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

config.transformer.minifierPath = 'metro-minify-esbuild'
config.transformer.minifierConfig = {
	// drop: ['console'],
}

// config.resolver.assetExts.push('db')

module.exports = config
