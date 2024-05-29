// const { getDefaultConfig } = require('expo/metro-config')
/** @type {import('@sentry/react-native/metro').MetroConfig} */
const { getSentryExpoConfig } = require('@sentry/react-native/metro')

// const config = getDefaultConfig(__dirname)
const config = getSentryExpoConfig(__dirname)

config.transformer.minifierPath = 'metro-minify-esbuild'
config.transformer.minifierConfig = {
	// You can automatically remove console.log statements using the following configuration:
	// drop: ['console'],
}
module.exports = config;