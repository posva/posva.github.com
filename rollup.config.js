import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import alias from 'rollup-plugin-alias'

export default {
  entry: 'assets/js/src/main.js',
  format: 'iife',
  plugins: [
    nodeResolve({ jsnext: true, main: true }),
    commonjs({
      sourceMap: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('dev'),
      'process.env.VUE_ENV': JSON.stringify('browser'),
    }),
    alias({
      vue: './node_modules/vue/dist/vue.js'
    })
  ]
}
