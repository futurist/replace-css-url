# replace-css-url

Independent lib to replace all `url()` and `@import` paths within css text, with custom function map.

This lib will try to keep the original css style format(quote with single, double, or none), or even worked when there's syntax error.

[![CircleCI](https://circleci.com/gh/futurist/replace-css-url.svg?style=svg)](https://circleci.com/gh/futurist/replace-css-url)

## Install

``` bash
npm install replace-css-url
```

## Usage

``` javascript
const replace_css_url = require('replace-css-url')

const css = `
@import "a.css"
@import url( b.css )
p { background: url('c.png') }
`

// prefix each path with 'http://myhost/'
console.log( replace_css_url(
  css,
  function(path){
    return 'http://myhost/' + path
  }
) )

// result css
`@import "http://myhost/a.css"
@import url( http://myhost/b.css )
p { background: url('http://myhost/c.png') }
`
```

This lib should be used in node, as a preprocessor of css.

If you want dynamicaly change url in browser, check this lib: [cssobj](https://github.com/cssobj/cssobj)

## API

### **lib(css, mapFunc)**

- **css** *[string]*

The css string want to be altered.

- **mapFunc** *[function]*, signature: `function(path){return newPath}`

A function that accept path for each appearance, both in `@import` or inside `url( )`.

Return the new path that wanted.

- **RETURN** *[string]*

The altered css with new paths.

If the `return_value` start with `'` or `"`, then you can replace/add the quote instead of original one, see [#1](https://github.com/futurist/replace-css-url/issues/3)


## Gotcha

This lib don't match any empty `url( )` or `''` `""`

## LICENSE

MIT

