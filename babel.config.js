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
            "#/components": "./components",
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
      ],
    ],
  };
};
