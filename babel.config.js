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
            "#/": "./",
            "#/app": "./app",
            "#/preferences": "./types",
            "#/ctypes": "./types",
            "#/assets": "./assets",
            "#/util": "./util",
            "#/src/components": "./components",
            "#/helpers": "./helpers",
            "#/screens": "./screens",
            "#/graphql": "./graphql/",
            "#/library": "./library",
            "#/constants": "./constants",
            "#/reactive": "./reactive/index.tsx",
            "#/gluestack": "./gluestack-ui.config",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        [
          "formatjs",
          {
            idInterpolationPattern: "[sha512:contenthash:base64:6]",
            ast: true,
          },
        ],
        "react-native-reanimated/plugin",
      ],
    ],
  };
};
