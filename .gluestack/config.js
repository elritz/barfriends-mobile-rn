var config = (() => {
  // gluestack-ui.config.json
  var tailwind = {
    config: "tailwind.config.js",
    css: "global.css",
  };
  var app = {
    entry: "app/_layout.tsx",
    components: "./src/components/ui",
  };
  var gluestack_ui_config_default = {
    tailwind,
    app,
  };
})();
module.exports = config;
