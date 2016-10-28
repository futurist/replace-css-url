// rollup.config.js

import {writeFileSync} from 'fs'
import buble from 'rollup-plugin-buble'
import minify from 'rollup-plugin-minify'

export default {
  entry: './src/replace-css-url.js',
  moduleName: 'replace_css_url',
  plugins:[
    buble(),
    minify({iife: 'dist/replace-css-url.min.js'})
  ],
  targets: [
    { format: 'es',   dest: 'dist/replace-css-url.es.js'   },
    { format: 'cjs',  dest: 'dist/replace-css-url.cjs.js'  },
    { format: 'amd',  dest: 'dist/replace-css-url.amd.js'  },
    { format: 'iife', dest: 'dist/replace-css-url.iife.js' },
  ]
}
