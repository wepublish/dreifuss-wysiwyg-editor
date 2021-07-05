const config = require('../../webpack.config')
const path = require('path')

config.entry = './src/index.ts'
config.output = {
  libraryTarget: 'umd',
  library: 'QuotationMarks',
  path: path.resolve(__dirname, 'dist'),
  filename: 'index.js',
  globalObject: 'this'
}

config.devtool = 'source-map'
config.externals = {
  react: 'react',
  'react-dom': 'react-dom'
}

module.exports = config
