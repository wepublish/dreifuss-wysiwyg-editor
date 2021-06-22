import configurations from '../../rollup.config'
import serve from 'rollup-plugin-serve'
import path from 'path'

const PACKAGE_ROOT_PATH = process.cwd()

const [config] = configurations
config.external = []
config.input = path.join(PACKAGE_ROOT_PATH, 'src/DreifussWysiwygEditorDemo.tsx')
config.output = {
  file: 'demo/bundle.js',
  format: 'iife'
}
config.plugins.push(
  serve({
    contentBase: 'demo',
    port: '7000'
  })
)

export default [config]
