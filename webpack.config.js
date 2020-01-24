/* eslint-disable global-require */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATH_SOURCE = path.join(__dirname, './src');
const PATH_DIST = path.join(__dirname, './dist');
const PATH_PUBLIC = path.join(__dirname, './public');

module.exports = (env) => {
  const { environtment } = env;
  const isProduction = environtment === 'production';
  const isDevelopment = environtment === 'development';

  const purgecss = require('@fullhuman/postcss-purgecss')({
    content: ['./src/**/*.js', './public/index.html'],
    defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  });

  return {
    mode: environtment,

    devServer: {
      // stats: 'errors-only',
      contentBase: PATH_DIST,
      host: 'localhost',
      port: 8080,
      historyApiFallback: true,
      overlay: {
        errors: true,
        warning: true,
      },
      open: true,
    },

    entry: [path.join(PATH_SOURCE, './index.js')],
    output: {
      path: PATH_DIST,
      filename: 'js/[name].[hash].js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['react-hot-loader/webpack', 'babel-loader'],
        },
        {
          test: /\.css$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                indent: 'postcss',
                plugins: [
                  require('autoprefixer'),
                  ...(isProduction ? [purgecss] : []),
                ],
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : 'css/[name].[hash].css',
        chunkFilename: isDevelopment ? '[id].css' : 'css/[id].[hash].css',
      }),
      new HtmlWebpackPlugin({
        template: path.join(PATH_PUBLIC, './index.html'),
      }),
    ],
  };
};
