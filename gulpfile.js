var gulp = require('gulp')
var babel = require('gulp-babel')
var sass = require('gulp-sass')

gulp.task('compile', () => {
  return gulp.src('src/**/*.{js,jsx}')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
})

gulp.task('sass', () => {
  return gulp.src('style/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/style'))
})
