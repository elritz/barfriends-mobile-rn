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

const {getDefaultConfig} = require('expo/metro-config')
const {withNativeWind} = require('nativewind/metro')

const config = getDefaultConfig(__dirname)

module.exports = withNativeWind(config, {input: './global.css'})

// // Learn more https://docs.expo.io/guides/customizing-metro
// const {getDefaultConfig} = require('expo/metro-config')
// const cfg = getDefaultConfig(__dirname)

// cfg.resolver.sourceExts = process.env.RN_SRC_EXT
//   ? process.env.RN_SRC_EXT.split(',').concat(cfg.resolver.sourceExts)
//   : cfg.resolver.sourceExts

// cfg.transformer.getTransformOptions = async () => ({
//   transform: {
//     experimentalImportSupport: true,
//     inlineRequires: true,
//     nonInlinedRequires: [
//       // We can remove this option and rely on the default after
//       // https://github.com/facebook/metro/pull/1126 is released.
//       'React',
//       'react',
//       'react/jsx-dev-runtime',
//       'react/jsx-runtime',
//       'react-native',
//     ],
//   },
// })

// module.exports = cfg
