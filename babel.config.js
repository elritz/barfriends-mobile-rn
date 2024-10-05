module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          lazyImports: true,
          native: {
            // Disable ESM -> CJS compilation because Metro takes care of it.
            // However, we need it in Jest tests since those run without Metro.
            disableImportExportTransform: !isTestEnv,
          },
        },
      ],
    ],
    plugins: [
      'macros',
      [
        'babel-plugin-react-compiler',
        {
          runtimeModule: 'react-compiler-runtime',
        },
      ],
      [
        'module-resolver',
        {
          alias: {
            '#/': '.',
            '#/app': './app',
            '#/types': './types',
            '#/assets': './assets',
            '#/reactive': './src/state/reactive/index.tsx',
            '#/gluestack': './gluestack-ui.config',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
      [
        'formatjs',
        {
          idInterpolationPattern: '[sha512:contenthash:base64:6]',
          ast: true,
        },
      ],
      'react-native-reanimated/plugin',
    ],
    env: {
      production: {
        plugins: ['transform-remove-console'],
      },
    },
  }
}
