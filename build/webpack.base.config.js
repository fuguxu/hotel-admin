
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const env = process.env.NODE_ENV
const DEV = env === 'dev'
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const cssModuleOption = { // 在cssModule的样式 无法通过postcss-loader给样式加前缀
  modules: true,
  localIdentName: '[local]--[hash:base64:5]',
  camelCase: true,
  sourceMaps: true
}
const cssModuleOptionLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: '../'
  }
}
const resolve = (dir) => { return path.join(__dirname, '../', dir) }

module.exports = {
  entry: {
    main: resolve('src/entry/main.js')
  },
  output: {
    path: resolve('dist'),
    publicPath: '',
    filename: DEV ? '[name].js' : 'js/[hash:8].[name].min.js',
    chunkFilename: DEV ? '[id].js' : 'js/[hash:8].[name].min.js',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['.js', '.vue', '.css', '.png', '.jpg'],
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('src/html/main.html'),
      filename: 'main.html',
      chunksSortMode: 'dependency',
      // favicon:resolve('src/img/favicon.ico'),
      inject: 'body',
      chunks: ['main', 'vendor'],
      hash: true,
      minify: {
        removeAttributeQuotes: true// 压缩 去掉引号
      }
    }),
    new webpack.DefinePlugin({
      __DEV__: env === 'dev',
      __PROD__: env === 'prod'
    }),
    new VueLoaderPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new MiniCssExtractPlugin({
      filename: DEV ? 'css/[name].css' : 'css/[hash:8].[name].min.css',
      chunkFilename: DEV ? 'css/[id].css' : 'css/[hash:8].[id].css',
      allChunks: true
    }),
    // new webpack.ProvidePlugin({// 使用时不用再import了 可以直接使用，是在每个模块中都定义了一个vue|$，而不是放在window上了,放在window上可以用expose-loader
    //   Vue: [resolve('node_modules/vue/dist/vue.min.js')] // 如果使用此编译版本，el-table无法渲染
          // $: 'jquery'
    // }),
    
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool
    })
  ],
  externals: { // 引用的时候 不打包进去
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: cssModuleOption
      },
      {
        test: /\.js$/,
        use: ['happypack/loader?id=babel'],
        exclude: /node_modules/,
        include: [path.join(__dirname, '../src')]
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              'css-hot-loader', cssModuleOptionLoader, 'postcss-loader',
              {
                loader: 'css-loader',
                options: cssModuleOption

              }
            ]
          },
          {
            use: ['css-hot-loader', cssModuleOptionLoader, 'css-loader', 'postcss-loader']
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'css-hot-loader',
          cssModuleOptionLoader,
          {
            loader: 'css-loader',
            options: cssModuleOption
          },
          {
            loader: 'postcss-loader',
            options: cssModuleOption
          },
          {
            loader: 'sass-loader',
            options: Object.assign({}, cssModuleOption, {
              data: '$globalColor: red;'
            })
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: DEV ? 'img/[name].[ext]' : 'img/[hash:8].[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              // disable: true,
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }

        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 40000,
            name: DEV ? 'fonts/[name].[ext]' : 'fonts/[hash:8].[name].[ext]'
          }
        }
        ]
      }
    ]
  }
}
