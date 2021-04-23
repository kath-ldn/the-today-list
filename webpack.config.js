const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  //target: 'node', // in order to ignore built-in modules like path, fs, etc.
  //externals: [nodeExternals({
  //  allowlist: ['@firebase', 'firebase', 'google-auth-library', 'gtoken', '@webpack-cli', 'url-loader',
  //  'webpack', 'webpack-cli', 'webpack-merge', 'webpack-node-externals', 'webpack-sources']
  //})], // in order to ignore all modules in node_modules folder
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
        },
    ]
  }
};