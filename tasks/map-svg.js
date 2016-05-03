const gulp = require('gulp');
const svgMapper = require('svg-symbols-map');

gulp.task('mapSVG', ['copyAssets'], () => svgMapper.map('src/svg-map/*.svg', 'dev/assets/map.svg'));
gulp.task('svg-mapping', ['mapSVG'], cb => {
  cb();
  gulp.watch('src/svg-map/*.svg', ['mapSVG']);
  gulp.watch('dev/svg-map/*', ['mapSVG']);
});

module.exports = {
  autoTask: 'svg-mapping'
};
