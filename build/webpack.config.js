require('dotenv').config()
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const { identity } = require('lodash')
const { resolve } = require('path')
const { env } = require('./common')
const isProd = env === 'production'
const {
  extractTextPlugin1,
  stylusSettingPlugin
} = require('./plugins')
const devServer = require('./dev-server')
const rules = require('./rules')
const prod = require('./production')
const { version } = require('./common')

let config = {
  mode: 'development',
  entry: {
    'rcpbs-faq': './src/client/index.js'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  output: {
    path: resolve(__dirname, '../dist/static'),
    filename: 'js/[name].' + version + '.bundle.js',
    publicPath: '/',
    chunkFilename: 'js/[name].bundle.js',
    libraryTarget: 'var',
    library: 'RcPCSF'
  },
  target: 'web',
  watch: true,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.json']
  },
  module: {
    rules
  },
  devtool: 'source-map',
  plugins: [
    stylusSettingPlugin,
    extractTextPlugin1,
    new AntdDayjsWebpackPlugin()
  ].filter(identity),
  devServer
}

if (isProd) {
  config = prod(config)
}

module.exports = config
