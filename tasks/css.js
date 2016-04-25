'use strict';

const sourcemaps = require('gulp-sourcemaps');
const gulp = require('gulp');
const sass = require('gulp-sass');
const beep = require('beepbeep');
const del = require('del');
const fs = require('fs');
const browserSync = require('browser-sync');
const stylelint = require('stylelint');
const cleanCSS = require('gulp-clean-css');

gulp.task('css', ['compileSass'], () => {
  gulp.watch(['src/scss/**/*.scss'], ['compileSass']);
});

const compileSass = (cb, dist) => {
  const dest = dist ? 'dist/css' : 'dev/css';

  del(dest).then(() =>
  {
    const glob = ['src/scss/*.scss', '!src/scss/_*.scss'];

    let stream = gulp.src(glob)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }))
    .on('error', error => {
      sass.logError.call(stream, error);
      beep(4);
    });

    if (dist) {
      stream = stream.pipe(cleanCSS())
      .pipe(sourcemaps.write('./'));
    }
    else {
      stream = stream.pipe(sourcemaps.write());
    }

    stream.pipe(gulp.dest(dest))
    .on('end', cb)
    .pipe(browserSync.get(dist ? 'dist' : 'dev').stream());
  }).catch(error => console.error(error));
};

gulp.task('compileSassDist', cb => {
  compileSass(cb, true);
});

gulp.task('compileSass', cb =>
{
  compileSass(cb);
});

module.exports = {
  autoTask: 'css',
  distTask: 'compileSassDist'
};
