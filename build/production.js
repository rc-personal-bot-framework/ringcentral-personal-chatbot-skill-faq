
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const {
  extractTextPlugin1,
  stylusSettingPlugin
} = require('./plugins')
module.exports = (config) => {
  config.plugins = [
    extractTextPlugin1,
    stylusSettingPlugin,
    new AntdDayjsWebpackPlugin()
  ]
  config.optimization = {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      '...'
    ]
  }
  config.mode = 'production'
  delete config.watch
  delete config.devtool
  delete config.devServer
  return config
}
