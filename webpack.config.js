const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
    library: {
      type: 'umd',
      name: 'linter',
    }
  },
  resolve: {
    fallback: {
        "fs": false,
    }
  },
  plugins: [
    new NodePolyfillPlugin()
  ]
};