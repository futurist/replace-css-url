/**
 * @fileOverview Replace all url() and @import paths within css text, with custom function map.
 * @name replace-css-url.js
 * @author James Yang <jamesyang999@gmail.com>
 * @license MIT
 * @link https://github.com/futurist/replace-css-url
 */

export default function replacePathInCSS (css, mapFunc) {
  return [
      /(@import\s+)(')(.+?)(')/gi,
      /(@import\s+)(")(.+?)(")/gi,
      /(url\s*\()(\s*)([^\s'")].*?)(\))/gi,
      /(url\s*\()(\s*')([^']+?)(')/gi,
      /(url\s*\()(\s*")([^"]+?)(")/gi,
  ].reduce((css, reg, index) => {
    return css.replace(reg, (all, lead, quote1, path, quote2) => {
      return lead + quote1 + mapFunc(path) + quote2
    })
  }, css)
}
