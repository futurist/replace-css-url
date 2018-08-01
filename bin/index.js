#!/usr/bin/env node
'use strict'

var replaceCSSUrl = require('../dist/replace-css-url.cjs.js')
var fs = require('fs')
var glob = require('glob')

const pkg = require('../package.json')
const defaultGlob = '**/*.css'
const cli = require('meow')(`
Usage
$ ${pkg.name} [globs] [options...]
Options
--version           Show version info
--help              Show help info
--exec, -e          Execute function to replace for every css file with "(fileName, url)=>newCSS"
--ignore, -i        Ignore blobs for file paths
--backup, -b        Create backup for each replace

globs default to '${defaultGlob}'

Examples
$ ${pkg.name} './assets/**/*.css' './static/**/*.css' --exec '(file,url)=>url'
`, {
  flags:{
    backup: {alias: 'b', type: 'boolean'},
    exec: {alias: 'e'},
    ignore: {alias: 'i'},
  }
})

let {flags, input} = cli

var globList = input && input.length ? input : [defaultGlob]
var ignore = ['**/node_modules/**'].concat(flags.ignore || [])

var replaceFunc = evalExpression(flags.exec)
if(typeof replaceFunc!='function') {
    console.log(pkg.name + ' --exec must be function')
    process.exit(1)
}

var pending = globList.length
globList.forEach(function (globPattern) {
  glob(globPattern, {ignore: ignore})
    .on('match', function (fileName) {
      try{
        var oldCSS = fs.readFileSync(fileName, 'utf8')
        var newCSS = replaceCSSUrl(
            oldCSS,
            function(url){ return replaceFunc(fileName, url) })
        if(oldCSS === newCSS) return
        flags.backup && fs.writeFileSync(fileName+'.bak', oldCSS, 'utf8')
        fs.writeFileSync(fileName, newCSS, 'utf8')
        console.log('** replaced css url:', fileName)
      }catch(e){
        console.log(fileName, e)
      }
    })
    .on('error', function (e) { console.error(e) })
    .on('end', function () { if (--pending === 0) console.log('done') })
})

process.on('unhandledRejection', function (e) { console.error('Uncaught (in promise) ' + e.stack) })

function evalExpression (code) { "use strict";
    try{
    return (new Function
        ( "return ("
        +   code
        +   ");"
        ))()
    }catch(e){}
}
