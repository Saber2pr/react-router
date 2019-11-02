const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path = require("path")

const extractLess = new ExtractTextPlugin("style.min.css")

const { WebpackConfig, templateContent } = require("@saber2pr/webpack-configer")

module.exports = WebpackConfig({
  entry: "./src/app.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  output: {
    filename: "bundle.min.js",
    path: path.join(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ["ts-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: templateContent("react-router", {
        injectHead: `<style>
          .a {
            color: black;
          }
          .a:active {
            background: black;
            color: white;
          }
        </style>`,
        injectBody: '<div id="root"></div>'
      })
    }),
    extractLess
  ]
})
