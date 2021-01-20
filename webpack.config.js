const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/index.html'),
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, './src/styles.css'),
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: 'src/assets/*.*',
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true),
    }),
  ],

};