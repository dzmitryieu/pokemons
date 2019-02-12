const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./common.config.js');

const pathsToClean = [
  'public',
];
const cleanOptions = {
  root: path.resolve(__dirname, '../../'),
  verbose: true,
  dry: false,
};

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash].min.js',
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCssAssetsPlugin({}),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
});
