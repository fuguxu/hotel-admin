/* eslint-disable new-cap */
const webpack = require('webpack')
const ora = require('ora')
const chalk = require('chalk')

const webpackConfig = require('./webpack.pro.config')

const spinner = ora('start building....')
spinner.start()

webpack(webpackConfig, (err, stats)=>{
  spinner.stop()
  if(err) throw err

  process.stdout.write(stats.toString({
    colors:true,
    modules:false,
    children:false,
    chunkModules:false,
    chunks:false
  }))

  if(stats.hasErrors()){
    console.log(chalk.red('build failed with errors!'))
    process.exit(1)
  }

  console.log(chalk.cyan('build finished!'))

})
