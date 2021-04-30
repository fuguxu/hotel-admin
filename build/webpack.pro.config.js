// const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const merge = require('webpack-merge')

const prodConfig = {
  devtool: false,
  mode: 'production',
  plugins: [
    // new CleanWebpackPlugin()
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    // concatenateModules:true,
    noEmitOnErrors: false,
    runtimeChunk: { // 提取webpack运行时文件 不提取的话会在入口文件里面，而不会出现在每个异步文件里面
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // commons: { // 公共模块 单入口不需要
        //   chunks: 'initial',
        //   minSize: 1,
        //   minChunks: 2,
        //   name: 'commons'
        // },
        vender: {// 第三方模块抽离
          priority: 1, // 权重 比commons要重
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name:'vender'
        }
      }
    },
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
