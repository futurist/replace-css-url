// rollup.config.js

import {writeFileSync} from 'fs'
import buble from 'rollup-plugin-buble'
import uglify from 'uglify-js'

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

function minify (minifyMap) {
  return {
    transformBundle: (code, option) => {
      Object.keys(minifyMap).forEach(format => {
        if (option.format == format) {
          const name = minifyMap[format]
          const mapName = name + '.map'
          const result = uglify.minify( code, {
            fromString: true,
            outSourceMap: mapName
          })
          writeFileSync(name, result.code, 'utf8')
          writeFileSync(mapName, result.map, 'utf8')
        }
      })
    }
  }
}
