const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () =>
  gulp.src('src/js/server.js')
    .pipe(babel({
      presets: ['es2015-node']
    }))
    .pipe(gulp.dest('dev'))
);
