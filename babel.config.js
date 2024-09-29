module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind",
        },
      ],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "#/": ".",
            "#/app": "./app",
            "#/preferences": "./types",
            "#/ctypes": "./types",
            "#/assets": "./assets",
            "#/reactive": "./reactive/index.tsx",
            "#/gluestack": "./gluestack-ui.config",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
      [
        "formatjs",
        {
          idInterpolationPattern: "[sha512:contenthash:base64:6]",
          ast: true,
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
