var gulp = require('gulp'),
    connect = require('gulp-connect'),
    consolidate = require('gulp-consolidate'),
    del = require('del'),
    iconfont = require('gulp-iconfont'),
    path = require('path'),
    rename = require('gulp-rename'),
    sketch = require('gulp-sketch'),
    tap = require('gulp-tap');

var fontName = 'fycons';
var template = 'fontawesome-style'; // TODO: build livefyre's fycon lodash template
var arr = [];

gulp.task('build', function(){
  gulp.src('Fycons.sketch')
    .pipe(sketch({
      export: 'slices',
      formats: 'svg'
    }))
    .pipe(tap(function(file, t) {
      var fileName = path.basename(file.path);
      var split = fileName.split('-');
      var tmp = {
        'index': +split[0],
        'fontHeight': +split[1],
        'name': split.slice(2).join('-'),
      };
      arr.push(tmp);
      console.log(arr);
    }))
    .pipe(iconfont({
      fontName: fontName,
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