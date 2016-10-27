/**
 * @fileOverview Replace all url() and @import paths within css text, with custom function map.
 * @name replace-css-url.js
 * @author James Yang <jamesyang999@gmail.com>
 * @license MIT
 * @link https://github.com/futurist/replace-css-url
 */

export default function replacePathInCSS (css, mapUrl) {
  base = base || ''
  return [
      /(@import\s+)(')(.+?)'/gi,
      /(@import\s+)(")(.+?)"/gi,
      /(url\s*\()(\s*)([^'"].+?\))/gi,
      /(url\s*\()\s*(')(.+?)'/gi,
      /(url\s*\()\s*(")(.+?)"/gi,
  ].reduce(function (css, reg) {
    return css.replace(reg, function (all, lead, quote, uri) {
      return lead + quote + mapUrl(uri) + quote
    })
  }, css)
}
