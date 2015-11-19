var gulp               = require('gulp');
var runSequence        = require('run-sequence');
var less               = require('gulp-less');
var autoprefixer       = require('gulp-autoprefixer');
var browserSync        = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');


var base = 'app/';

gulp.task('default', function() {
  return runSequence('clean', 'style', 'browser-sync', 'watch')
});

gulp.task('clean', function() {

});

gulp.task('style', function() {
  runSequence('compileLess', 'autoprefix');
});

gulp.task('compileLess', function() {
  return gulp.src(base + 'app.less')
    .pipe(less())
    .pipe(gulp.dest(base))
    .pipe(browserSync.stream());
});

gulp.task('autoprefix', ['compileLess'], function () {
  return gulp.src(base + 'main.css')
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest(base));
});

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./app",
      middleware: [ historyApiFallback() ]
    }
  });
});

gulp.task('watch', function() {
  gulp.watch(base + '**/*.less', ['style']);
  gulp.watch(base + '**/*.html').on('change', browserSync.reload);
  gulp.watch(base + '**/*.js').on('change', browserSync.reload);
});