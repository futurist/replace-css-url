# replace-css-url

Independent lib to replace all url() and @import paths within css text, with custom function map.

This lib will try to keep the original css style format(quote with single, double, or none), or even worked when there's have syntax error.

[![CircleCI](https://circleci.com/gh/futurist/replace-css-url.svg?style=svg)](https://circleci.com/gh/futurist/replace-css-url)

## Install

- npm

``` bash
npm install replace-css-url
```

- bower

``` bash
bower install replace-css-url
```

## Usage

``` javascript
const replace_css_url = require('replace-css-url')

const css = `
@import "a.css"
@import url(b.css)
p { background: url('c.png') }
`

// below will add each path with myhost URL
console.log( replace_css_url(css, path => 'http://myhost/' + path) )

```

If you want css-in-js solution, check this lib: [cssobj](https://github.com/cssobj/cssobj)

## API

### **lib(css, mapFunc)**

- **css** *[string]*

the css string want to be altered.

- **mapFunc** *[function]*, signature: `function(path){return newPath}`

A function that accept path for each appearance, both in `@import` or inside `url()`.

Return the new path that wanted.

- **RETURN** *[string]*

The altered css with new paths.


## LICENSE

MIT

