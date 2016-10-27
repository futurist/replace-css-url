'use strict';


function replacePathInCSS (css, mapFunc) {
  return [
      /(@import\s+)(')(.+?)'/gi,
      /(@import\s+)(")(.+?)"/gi,
      /(url\s*\()(\s*)([^'"].+?\))/gi,
      /(url\s*\()\s*(')(.+?)'/gi,
      /(url\s*\()\s*(")(.+?)"/gi,
  ].reduce(function (css, reg) {
    return css.replace(reg, function (all, lead, quote, path) {
      return lead + quote + mapFunc(path) + quote
    })
  }, css)
}

module.exports = replacePathInCSS;
