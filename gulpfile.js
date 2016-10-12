var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    minifyCss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    wiredep = require('wiredep').stream;

var reload = browserSync.reload;

gulp.task('default', ['watch', 'bower', 'sass'], function () {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: [
        'app'
      ]
    }
  });
});

gulp.task('watch', function () {
  gulp.watch([
    'app/index.html',
    'app/templates/**/*.html',
    'app/components/**/*.html',
    'app/app.js',
    'app/templates/**/*.js',
    'app/components/**/*.js',
    'app/models/*.js',
    'app/factory/*.js'
  ]).on('change', reload);
  gulp.watch('bower.json', ['bower']);
  gulp.watch([
        'app/style.scss',
        'app/_setting.scss',
        'app/templates/**/*.scss',
        'app/templates/**/**/*.scss',
        'app/components/**/*.scss'
      ], ['sass']
  );

});

gulp.task('sass', function () {
  return gulp.src('app/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('app'))
      .pipe(reload({stream: true}));
});

gulp.task('bower', function () {
  gulp.src('app/index.html')
      .pipe(wiredep({
        directory: "app/bower_components"
      }))
      .pipe(gulp.dest('app/'));
});

gulp.task('html', function () {
  return gulp.src(['app/**/*.html', '!app/bower_components/**'])
      .pipe(gulp.dest('../site/'));
});

gulp.task('images', function () {
  gulp.src('app/favicon.ico')
      .pipe(gulp.dest('../site/'));
  return gulp.src(['app/images/*.png', 'app/images/*.gif', 'app/images/**/*.svg'])
      .pipe(gulp.dest('../site/images/'));
});

gulp.task('fonts', function () {
  return gulp.src(['app/fonts/*'])
      .pipe(gulp.dest('../site/fonts/'));
});

gulp.task('build', ['bower', 'sass', 'html', 'images', 'fonts'], function () {
  return gulp.src('app/index.html')
      .pipe(useref())
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', minifyCss()))
      .pipe(gulp.dest('../site/'));
});