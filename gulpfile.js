var fs = require('fs')
var exec = require('child_process').exec
var gulp = require('gulp')
var bump = require('gulp-bump')

// Basic usage:
// Will patch the version
gulp.task('bump', function () {
  gulp.src('./package.json')
    .pipe(bump())
    .pipe(gulp.dest('./'))
})

gulp.task('tag', function () {
  var version = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version
  exec('git tag ' + version + ' && git push --tags', err => err)
})
