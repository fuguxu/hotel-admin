// const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const resolve = (dir) => { return path.join(__dirname, '../', dir) }
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
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    // new webpack.NamedModulesPlugin(), // 告诉我们哪个模块更新了 webpack4已经默认安装这个插件
    new webpack.optimize.ModuleConcatenationPlugin(), // scope hoisting作用域提升，打包代码体积更小，运行更快，production模式下默认开启
    new webpack.DllReferencePlugin({
      manifest: require('../src/public/dll/vendor.manifest')
    }),
    new webpack.DllReferencePlugin({
      manifest: require('../src/public/dll/polyfill.manifest')
    }),
    new AddAssetHtmlPlugin([
      {
        filepath: resolve('src/public/dll/_dll_polyfill.js'),
        outputPath: 'dll',
        publicPath: 'dll',
        includeSourcemap: false
      },
      {
        filepath: resolve('src/public/dll/_dll_vendor.js'),
        outputPath: 'dll',
        publicPath: 'dll',
        includeSourcemap: false
      }
    ]),
  ]
}

module.exports = merge(baseWebpackConfig, devConfig)
