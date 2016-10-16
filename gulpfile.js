var gulp          = require('gulp');
var notify        = require('gulp-notify');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var babelify      = require('babelify');
var ngAnnotate    = require('browserify-ngannotate');
var browserSync   = require('browser-sync').create();
var concat        = require('gulp-concat');

function interceptErrors (error) {
  var args = Array.prototype.slice.call(arguments);

  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  this.emit('end');
};

gulp.task('browserify', function() {
  return browserify('./src/app.js')
      .transform(babelify, {presets: ['es2015']})
      .transform(ngAnnotate)
      .bundle()
      .on('error', interceptErrors)
      .pipe(source('index.js'))
      .pipe(gulp.dest('./build/'));
});

gulp.task('html', function() {
  return gulp.src('./index.html')
      .on('error', interceptErrors)
      .pipe(gulp.dest('./build/'));
});

gulp.task('styles', function(){
  return gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/bootstrap/dist/css/bootstrap-theme.css'
  ]).pipe(concat('theme.css'))
    .pipe(gulp.dest('./build'));
})

gulp.task('fonts', function(){
  return gulp
    .src(['node_modules/bootstrap/dist/fonts/**/*'])
    .pipe(gulp.dest('./build/fonts'))
})

gulp.task('default', ['html', 'browserify', 'styles', 'fonts'], function() {
  browserSync.init(['./build/**/**.**'], {
    server: './build',
    port: 3000,
    notify: false,
    ui: {
      port: 3001
    }
  });

  gulp.watch('src/index.html', ['html']);
  gulp.watch('src/**/*.js', ['browserify']);
});
