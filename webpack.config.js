const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      components: path.resolve(__dirname, 'src/components/')
    }
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
    new WebpackManifestPlugin(),
    new MiniCssExtractPlugin({ filename: `${isDev ? '[name]' : '[name]-[contenthash]'}.css` }),
    new CopyPlugin({ patterns: [{ from: 'static' }] })
  ],
  module: {
    ...common.module,
    rules: [
      ...common.module.rules,
      { test: /\.s[ac]ss$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] }
    ]
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
  },
  module: {
    ...common.module,
    rules: [
      ...common.module.rules,
      { test: /\.s[ac]ss$/i, use: 'null-loader' }
    ]
  }
};

module.exports = [clientConfig, serverConfig];
