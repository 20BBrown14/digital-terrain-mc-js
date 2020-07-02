const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const testHarness = require('./__mocks__/routes.mock');

module.exports = {

  devServer: testHarness,

  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx$)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/antd'),
        ],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/antd'),
        ],
        use: ['css-loader', 'less-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: [
          'file-loader?name=[name].[ext]',
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
      favicon: './public/bee.ico',
    }),
  ],
};
