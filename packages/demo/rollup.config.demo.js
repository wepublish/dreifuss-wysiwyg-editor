import fs from 'fs'
import path from 'path'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import includePaths from 'rollup-plugin-includepaths'
import json from '@rollup/plugin-json'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import resolve from '@rollup/plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import typescript from 'rollup-plugin-typescript2'
import styles from 'rollup-plugin-styles'

const PACKAGE_ROOT_PATH = process.cwd()
const INPUT_FILE_PATH = path.join(PACKAGE_ROOT_PATH, 'src/DreifussWysiwygEditorDemo.tsx')
const INPUT_FILE = fs.existsSync(INPUT_FILE_PATH)
  ? INPUT_FILE_PATH
  : path.join(PACKAGE_ROOT_PATH, 'src/index.tsx')

const includePathOptions = {
  include: {},
  paths: [path.join(PACKAGE_ROOT_PATH, 'src')],
  external: [],
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
}

const plugins = [
  // Let you use relative paths in your import directives
  includePaths(includePathOptions),

  // Allow Rollup to resolve modules from `node_modules`, since it only
  // resolves local modules by default.
  resolve({
    browser: true
    // modulesOnly: true,
  }),

  typescript({
    clean: true,
    check: false,
    tsconfig: path.join(PACKAGE_ROOT_PATH, 'tsconfig.base.json'),
    useTsconfigDeclarationDir: true
  }),

  // Allow Rollup to resolve CommonJS modules, since it only resolves ES2015
  // modules by default.
  commonjs({
    include: /node_modules/,
    sourceMap: false
  }),

  // Convert JSON imports to ES6 modules.
  json(),

  // Register Node.js builtins for browserify compatibility.
  builtins(),

  // Use Babel to transpile the result, limiting it to the source code.
  babel({
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: {
            node: 'current'
          }
        }
      ],
      '@babel/preset-react',
      '@babel/preset-typescript'
    ],
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      'babel-plugin-dynamic-import-node',
      'babel-plugin-styled-components',
      ['inline-json-import', {}],
      [
        'import',
        {
          libraryName: 'lodash',
          libraryDirectory: '',
          camel2DashComponentName: false
        },
        'lodash'
      ],
      [
        'import',
        {
          libraryName: 'react-use',
          libraryDirectory: 'lib',
          camel2DashComponentName: false
        },
        'react-use'
      ]
    ],
    env: {
      test: {
        presets: [
          ['@babel/preset-react', {modules: '../../../../commonjs'}],
          ['@babel/preset-env', {modules: '../../../../commonjs'}]
        ]
      }
    },
    extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'],
    exclude: /node_modules/,
    babelHelpers: 'inline'
  }),

  styles(),

  // Register Node.js globals for browserify compatibility.
  globals(),

  serve({
    contentBase: 'demo',
    port: '8000',
    verbose: true
  }),
  livereload({
    watch: 'demo'
  })
]

export default [
  {
    input: INPUT_FILE,
    external: [],
    // external(id) {
    //      return Object.keys(PKG_JSON.dependencies || {})
    //        .concat(Object.keys(PKG_JSON.peerDependnencies || {}))
    //        .includes(id.split('/')[0]);
    //    },
    output: [
      // CommonJS (for Node)
      {
        file: 'demo/bundle.js',
        format: 'iife'
      }
    ],
    plugins,
    watch: {
      include: 'src/**'
      // exclude: 'node_modules/**',
    }
  }
]
