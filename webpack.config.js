const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const distPath = path.join(__dirname, 'dist');
const isDev = process.env.NODE_ENV === 'development';

const common = {
  ...(isDev && {
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
    bundle: './src/client.js'
  },
  output: {
    path: distPath,
    publicPath: '',
    filename: `${isDev ? '[name]' : '[name]-[contenthash]'}.js`
  },
  plugins: [
    new WebpackManifestPlugin()
  ]
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
