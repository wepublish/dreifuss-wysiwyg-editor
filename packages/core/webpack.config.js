// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = function (env, argv) {
  return {
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-map' : 'inline-source-map',

    devServer: {
      historyApiFallback: true
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias:
        argv.mode === 'production'
          ? {}
          : {
              'react-dom': '@hot-loader/react-dom'
            }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-typescript',
              ['@babel/preset-env', {modules: false}]
            ],
            plugins: [
              'babel-plugin-twin',
              'babel-plugin-macros',
              'styled-components',
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-proposal-nullish-coalescing-operator',
              ...(argv.mode === 'production' ? [] : ['react-hot-loader/babel'])
            ]
          }
        },
        {
          test: /\.(css|less)$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true
                }
              }
            }
          ]
        }
      ]
    },

    entry: {
      index: env.production ? './src/index.ts' : './src/DreifussWysiwygEditorDemo.tsx'
    },

    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index_bundle.js',
      libraryTarget: 'umd',
      library: 'my-design-system'
    },
    /* externals: {
      '@dreifuss-wysiwyg-editor/plate-quotation-marks-ui': '@dreifuss-wysiwyg-editor/plate-quotation-marks-u'
    }, */

    plugins: [
      new HtmlWebpackPlugin({
        template: './demo/index.html'
      })
    ]
  }
}
