const path = require('path');

module.exports = {
  entry: {
    bundle: ['./src/client.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['./js', '.jsx']
        },
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
