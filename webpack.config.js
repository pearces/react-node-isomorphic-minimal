const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

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
      components: path.resolve(__dirname, 'src/components/'),
      actions: path.resolve(__dirname, 'src/actions/'),
      reducers: path.resolve(__dirname, 'src/reducers/')
    }
  },
  optimization: {
    minimize: !isDev,
    minimizer: ['...', new CssMinimizerPlugin()]
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
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  plugins: [new MiniCssExtractPlugin({ filename: 'inline.css' })],
  module: {
    ...common.module,
    rules: [
      ...common.module.rules,
      { test: /\.s[ac]ss$/i, use: 'null-loader' },
      { test: /Main\.s[ac]ss$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] }
    ]
  }
};

module.exports = [clientConfig, serverConfig];
