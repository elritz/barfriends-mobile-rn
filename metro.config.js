// const { withNativeWind } = require("nativewind/metro");

// // const { getDefaultConfig } = require('expo/metro-config')
// /** @type {import('@sentry/react-native/metro').MetroConfig} */
// const { getSentryExpoConfig } = require("@sentry/react-native/metro");

// // const config = getDefaultConfig(__dirname)
// const config = getSentryExpoConfig(__dirname);

// config.transformer.minifierPath = "metro-minify-esbuild";
// config.transformer.minifierConfig = {
//   // You can automatically remove console.log statements using the following configuration:
//   // drop: ['console'],
// // };
// module.exports = withNativeWind(config, {
//   input: "./global.css",
// });

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
