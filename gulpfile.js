var gulp = require('gulp')
var babel = require('gulp-babel')

gulp.task('compile', () => {
  return gulp.src('src/**/*.{js,jsx}')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
})

