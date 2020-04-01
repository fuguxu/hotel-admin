/* eslint-disable new-cap */
const webpack = require('webpack')
const express = require('express')
const opn = require('opn')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const webpackConfig = require('./webpack.dev.config')
const port = webpackConfig.devServer.port
const host = webpackConfig.devServer.host

let compiler = webpack(webpackConfig)

const app = new express()

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
  // lazy: true
}))
app.use(webpackHotMiddleware(compiler, {
  log: () => {},
  path: '/__webpack_hmr'
}))
// console.log('************compiler********', compiler)
/*
* 设置静态资源地址
 */
// app.use(express.static(webpackConfig.output.path))

opn(`http://${host}:${port}/main.html`)

app.listen(port, (err) => {
  if (err) {
    throw Error(err)
  } else {
    // let url = 'http://localhost:' + port
    console.log('listening on port %s', port)
  }
})
