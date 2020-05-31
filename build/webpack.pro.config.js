// const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const merge = require('webpack-merge')

const prodConfig = {
  devtool: '#source-map',
  mode: 'production',
  plugins: [
    // new CleanWebpackPlugin()
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
            pure_funcs: ['console.log']
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { map: { inline: false } }
      })
    ]
  },
  module: {}

}

module.exports = merge(baseWebpackConfig, prodConfig)
