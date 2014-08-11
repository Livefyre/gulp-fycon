var gulp = require('gulp'),
    connect = require('gulp-connect'),
    consolidate = require('gulp-consolidate'),
    del = require('del'),
    iconfont = require('gulp-iconfont'),
    print = require('gulp-print'),
    rename = require('gulp-rename'),
    sketch = require('gulp-sketch'),
    tap = require('gulp-tap');

var fontName = 'fycons';
var template = 'fontawesome-style'; // build livefyre's fycon lodash template

gulp.task('fycons', function(){
  gulp.src('Fycons.sketch')
    .pipe(sketch({
      export: 'slices',
      formats: 'svg'
    }))
    // .pipe(tap(function(file)) {

    // })
    // .pipe(print()) // prints to console contents of pipe();
    .pipe(iconfont({
      fontName: fontName,
      // problem is that certain fycons are optimzed for certain heights
      // we can't pass a single fontHeight or normalize without jankifying
      // another portion. Maybe split fycons into different files with
      // their respective heights, pipe separately and then combine into one file?
      // fontHeight: 12,
      // normalize: true,
    }))
    .on('codepoints', function(codepoints) {
      // set font options {}
      var options = {
        glyphs: codepoints,
        fontName: fontName,
        fontPath: '../fonts/',
        className: 'fycons',
      };
      // build css src
      gulp.src('templates/' + template + '.css')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:fontName }))
        .pipe(gulp.dest('dist/css/'));
        
      // sample.html
      gulp.src('templates/' + template + '.html')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:'index' }))
        .pipe(gulp.dest('dist/'));
    })
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('watch', function(){
    gulp.watch('*.sketch/Data', ['fycons']);
});


gulp.task('clean', function() {
  del(['dist/'], function(err) {
    console.log('Successfully removed dist/');
  });
});

gulp.task('start', function() {
  connect.server({
    livereload: true,
    root: 'dist'
  })
});