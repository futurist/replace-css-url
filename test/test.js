var expect = require('chai').expect
var lib = require('../')

describe('test', function() {
  it('@import and url', function() {
    const css = `
@import url("fineprint.css") print;
@import url(bluish.css) projection, tv;
@import url( blu"ish.css) projection, tv;
@import 'custom.css';
@import url( "chrome://communicator/skin/");
@import "common.css" screen, projection;
@import url( 'landscape.css') screen and (orientation:landscape);
p {background: url(a.png) url('b.png') url("c.png")}
`

    expect(lib(css, path=>'+++'+path)).equal(`
@import url("+++fineprint.css") print;
@import url(+++bluish.css) projection, tv;
@import url( +++blu"ish.css) projection, tv;
@import '+++custom.css';
@import url( "+++chrome://communicator/skin/");
@import "+++common.css" screen, projection;
@import url( '+++landscape.css') screen and (orientation:landscape);
p {background: url(+++a.png) url('+++b.png') url("+++c.png")}
`
    )


  })

  it('should work with empty and one char url', function() {
    const css = `
@import url("") print;
@import url( b ) projection, tv;
@import url(b) projection, tv;
@import url( ) projection, tv;
@import url() projection, tv;
@import 'c';
@import url( "x");
p {background: url() url('') url('') url("") url(   "c.png")}
`

    expect(lib(css, path=>'+++'+path)).equal(`
@import url("") print;
@import url( +++b ) projection, tv;
@import url(+++b) projection, tv;
@import url( ) projection, tv;
@import url() projection, tv;
@import '+++c';
@import url( "+++x");
p {background: url() url('') url('') url("") url(   "+++c.png")}
`)

  })

  it('should work with custom quote', function() {
    const css = `
@import url( ) projection, tv;
@import url( '' ) print;
@import url( "" ) print;
@import url( 'd' ) print;
@import url( b ) projection, tv;
p {background: url(   "c.png")}
`

    expect(lib(css, path=>'"'+path+'"')).equal(`
@import url( ) projection, tv;
@import url( '' ) print;
@import url( "" ) print;
@import url("d" ) print;
@import url( "b" ) projection, tv;
p {background: url("c.png")}
`)

    const css2 = `
a {background: url(c.png)}
`;

    expect(lib(css2, path=>'"' + '/asdf/' + path + '"')).equal(`
a {background: url("/asdf/c.png")}
`);
  })
})
