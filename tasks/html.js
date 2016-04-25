'use strict';

const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync');
// const vinylPaths = require('vinyl-paths');
// const changed = require('gulp-changed');

const dirs = ['html'];

gulp.task('html', ['copyHTML'], cb => {
  cb();
  gulp.watch(dirs.map(() => `src/*.html`), ['copyHTML']);
});

const copyHTML = dist => new Promise((resolve, reject) => {
  const dir = dist ? 'dist' : 'dev';
  del(`${dir}/*.html`).then(() =>
  {
    gulp.src('src/*.html')
    .pipe(gulp.dest(`${dir}/`))
    .on('error', error => reject(error))
    .on('end', () => {
      resolve();
      browserSync.get(dir).reload();
    });
  }).catch(reason => {
    console.error(reason);
    reject(reason);
  });
});

// copying assets
gulp.task('copyHTML', () => copyHTML());
gulp.task('copyHTMLDist', () => copyHTML(true));

module.exports = {
  autoTask: 'html',
  distTask: 'copyHTMLDist'
};
