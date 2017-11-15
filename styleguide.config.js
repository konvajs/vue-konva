const webpackConfig = require("./build/webpack.base.conf");
const merge = require("webpack-merge");
const path = require("path");

delete webpackConfig.resolve.alias.vue;

module.exports = {
  title: "Vue Konva",
  webpackConfig: merge(webpackConfig, {
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        }
      ]
    }
  }),
  mixins: ["docs/mixin.js"],
  styleguideComponents: {
    Logo: path.join(__dirname, "docs/logo.js")
  },
  template: "docs/styleguide.template.html",
  require: [
    path.join(__dirname, "docs/styleguide.styles.css"),
    path.join(__dirname, "lib/vue-konva.min.js")
  ],
  defaultExample: false,
  highlightTheme: "night",
  showCode: true,
  showUsage: true,
  styleguideDir: "distDoc",
  sections: [
    {
      name: "Introduction",
      content: "docs/introduction.md"
    },
    {
      name: "API",
      content: "docs/api.md",
      components: "docs/CoreShapes.vue"
    },
    {
      name: "PlayGround",
      content: "docs/playground.md"
    },
    {
      name: "Events",
      content: "docs/events.md"
    },
    {
      name: "Animations",
      content: "docs/animations.md"
    }
  ]
};
