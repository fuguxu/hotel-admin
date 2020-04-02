// const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge')
// const webpack = require('webpack')
const entrys = {}
Object.keys(baseWebpackConfig.entry).forEach((name) => {
  entrys[name] = [baseWebpackConfig.entry[name]].concat(['webpack-hot-middleware/client?noInfo=true&reload=true']) // 热更新需要
})
const devConfig = {
  devtool: '#eval-source-map',
  mode: 'development',
  devServer: {
    // contentBase: '../',
    hot: true,
    inline: true,
    publicPath: baseWebpackConfig.output.publicPath,
    port: 9999,
    host: 'localhost',
    stats: { cached: false, colors: true },
    disableHostCheck: true
  },
  entry: entrys,
  watch: true,
  watchOptions: {// 监控选项
    poll: 1000, // 每秒问我1000次
    aggregateTimeout: 500, // 防抖
    ignored: /node_modules/ //

  },
  plugins: [
    // new OpenBrowserPlugin({ url: 'http://localhost:9999/main.html' })
    // new BundleAnalyzerPlugin()
  ]
}

module.exports = merge(baseWebpackConfig, devConfig)
