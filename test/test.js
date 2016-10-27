var expect = require('chai').expect
var lib = require('../')

describe('test', function() {
  it('@import and url', function() {
    const css = `
@import url("fineprint.css") print;
@import url(bluish.css) projection, tv;
@import url(blu"ish.css) projection, tv;
@import 'custom.css';
@import url("chrome://communicator/skin/");
@import "common.css" screen, projection;
@import url('landscape.css') screen and (orientation:landscape);
`

    expect(lib(css, path=>'+++'+path)).equal(`
@import url("+++fineprint.css") print;
@import url(+++bluish.css) projection, tv;
@import url(+++blu"ish.css) projection, tv;
@import '+++custom.css';
@import url("+++chrome://communicator/skin/");
@import "+++common.css" screen, projection;
@import url('+++landscape.css') screen and (orientation:landscape);
`
    )


  })
})
