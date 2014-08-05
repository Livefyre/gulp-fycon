var gulp = require("gulp");
var rename = require("gulp-rename");
var sketch = require("gulp-sketch");
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');

var fontName = 'fycons';
var template = 'fontawesome-style'; // build livefyre's fycon lodash template

gulp.task('fycons', function(){
  gulp.src('Fycons.sketch')
    .pipe(sketch({
      export: 'slices',
      formats: 'svg'
    }))
    .pipe(iconfont({
      fontName: fontName,
      // problem is that certain fycons are optimzed for certain heights
      // we can't pass a single fontHeight or normalize without jankifying
      // another portion. Maybe split fycons into different files with
      // their respective heights, pipe separately and then combine into one file?
      // fontHeight: 10,
      normalize: true,
      // TODO: debug support for appendCodepoints
      // appendCodepoints: true
    }))
    .on('codepoints', function(codepoints) {
      var options = {
        glyphs: codepoints,
        fontName: fontName,
        fontPath: '../fonts/',
        className: 'fycons',
      };
      gulp.src('templates/' + template + '.css')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:fontName }))
        .pipe(gulp.dest('dist/css/'));
        
      // sample.html
      gulp.src('templates/' + template + '.html')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:'sample' }))
        .pipe(gulp.dest('dist/'));
    })
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('watch', function(){
    gulp.watch('*.sketch/Data', ['fycons']);
});
