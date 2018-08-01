#!/usr/bin/env node
'use strict'

var replaceCSSUrl = require('../dist/replace-css-url.cjs.js')
var fs = require('fs')
var glob = require('glob')

function parseArgs (argv) {
  argv = ['--match'].concat(argv.slice(2))
  var args = {}
  var name
  argv.forEach(function (arg) {
    if (/^--/.test(arg)) {
      name = arg.substr(2)
      args[name] = args[name] || []
    } else {
      args[name].push( name=='exec' ? evalExpression(arg) : arg)
    }
  })
  return args
}

var args = parseArgs(process.argv)
var globList = args.match && args.match.length ? args.match : ['**/*.css']
var ignore = ['**/node_modules/**'].concat(args.ignore || [])

var replaceFunc = (args.exec||[])[0]
if(typeof replaceFunc!='function') {
    console.log('[replace-css-url] --exec must be function')
    process.exit(1)
}

var pending = globList.length
globList.forEach(function (globPattern) {
  glob(globPattern, {ignore: ignore})
    .on('match', function (fileName) {
        var oldCSS = fs.readFileSync(fileName, 'utf8')
        var newCSS = replaceCSSUrl(
            oldCSS, 
            function(url){ return replaceFunc(fileName, url) })
        args.backup && fs.writeFileSync(fileName+'.bak', oldCSS, 'utf8')
        fs.writeFileSync(fileName, newCSS, 'utf8')
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
