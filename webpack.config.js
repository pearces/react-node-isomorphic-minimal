const path = require('path');
const nodeExternals = require('webpack-node-externals');

const distPath = path.join(__dirname, 'dist');

const moduleConfig = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      resolve: {
        extensions: ['.js', '.jsx']
      },
      use: {
        loader: 'babel-loader'
      }
    }
  ]
};

const clientConfig = {
  entry: {
    bundle: ['./src/client.js']
  },
  output: {
    path: distPath,
    filename: '[name].js'
  },
  module: moduleConfig
};

const serverConfig = {
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/server.js',
  output: {
    path: distPath,
    filename: 'server.js'
  },
  module: moduleConfig
};

module.exports = [clientConfig, serverConfig];
