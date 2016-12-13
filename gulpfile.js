var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');

var path = {
  HTML: 'static/index.html',
  OUT: 'build.js',
  DEST: 'static/dist',
  ENTRY_POINT: './static/app.js'
};

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify, lessify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher
    .on('update', function () {
      watcher
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST))
        console.log('Updated');
    })
    .on('transform', function (tr, file) {
      console.log('^.^: ', file);
    })
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST));
});
