const path = require('path');
const nodeExternals = require('webpack-node-externals');

const distPath = path.join(__dirname, 'dist');

const common = {
  ...(process.env.NODE_ENV === 'development' && {
    watch: true,
    watchOptions: {
      ignored: /node_modules/
    },
    devtool: 'eval-source-map'
  }),
  module: {
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
  }
};

const clientConfig = {
  ...common,
  target: 'browserslist',
  entry: {
    bundle: ['./src/client.js']
  },
  output: {
    path: distPath,
    filename: '[name].js'
  }
};

const serverConfig = {
  ...common,
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/server.js',
  output: {
    path: distPath,
    filename: 'server.js'
  }
};

module.exports = [clientConfig, serverConfig];
