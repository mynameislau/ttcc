'use strict';

const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync');
// const vinylPaths = require('vinyl-paths');
// const changed = require('gulp-changed');

const dirs = ['assets'];

gulp.task('assets', ['copyAssets'], cb => {
  cb();
  gulp.watch(dirs.map(item => `src/${item}/**/*.*`), ['copyAssets']);
});

const copyAssets = dist => new Promise((resolve, reject) => {
  const dir = dist ? 'dist' : 'dev';
  del(dirs.map(item => `${dir}/${item}/*`)).then(() =>
  {
    Promise.all(
      dirs.map(item => new Promise((resolve, reject) => {
        gulp.src(`src/${item}/**/*.*`)
        .pipe(gulp.dest(`${dir}/${item}`))
        .on('error', error => reject(error))
        .on('end', () => {
          resolve();
        });
      }))
    ).then(() => {
      resolve();
      browserSync.get(dir).reload();
    });
  }).catch(reason => {
    console.error(reason);
    reject(reason);
  });
});

//copying assets
gulp.task('copyAssets', () => copyAssets());
gulp.task('copyAssetsDist', () => copyAssets(true));

module.exports = {
  autoTask: 'assets',
  distTask: 'copyAssetsDist'
};
