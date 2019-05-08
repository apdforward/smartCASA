const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.ejs',
      sentryDns: 'https://b7c67c111d834a39a1eb96417f76616b@sentry.io/1411397',
      inject: false
    })
  ],
  devServer: {
    compress: true,
    port: 9000
  }
};
