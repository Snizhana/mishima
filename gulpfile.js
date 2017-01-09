const gulp = require('gulp'),
  babel = require('gulp-babel'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  debug = require('gulp-debug'),
  sourcemaps = require('gulp-sourcemaps'),
  gulpif = require('gulp-if'),
  path = require('path'),
  remember = require('gulp-remember'),
  cached = require('gulp-cached'),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  concat = require('gulp-concat'),

  isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';



gulp.task('styles', () => {
  return gulp.src('static/style/sass/Site.scss')
    .pipe(plumber({
      errorHandler: notify.onError((err) => {
        return {
          title: 'styles',
          message: err.message
        }
      })
    }))
    .pipe(cached('styles'))
    .pipe(remember('styles'))
    .pipe(gulpif(isDevelopment, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpif(isDevelopment, sourcemaps.write('.')))
    .pipe(gulp.dest('static/style/css/'))
    .pipe(livereload());
});

gulp.task('scripts', () => {
  return gulp.src('static/js/src/**/*.js')
    .pipe(plumber({
      errorHandler: notify.onError((err) => {
        return {
          title: 'scripts',
          message: err.message
        }
      })
    }))
    .pipe(babel({
      presets: 'es2015'
    }))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('static/js/dist'));
});

gulp.task('default', () => {
  livereload.listen();
  gulp.watch('static/js/src/**/*.js', ['scripts']);
  gulp.watch('static/style/sass/*.scss', ['styles'])
    .on('unlink', (filepath) => {
      remember.forget('styles', path.resolve(filepath));
      delete cached.cashes.styles[path.resolve(filepath)];
    });
});
