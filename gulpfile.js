'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const fs = require('fs');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

let autoTasksNames;
let distTasksNames;

browserSync.create('dist');
browserSync.create('dev');

const taskFilenames = fs.readdirSync('./tasks');
const taskModules = [];
// auto requiring tasks
taskFilenames.forEach(filePath => {
  taskModules.push(require(`./tasks/${filePath}`));
  autoTasksNames = taskModules.filter(module => module.autoTask).map(module => module.autoTask);
  distTasksNames = taskModules.filter(module => module.distTask).map(module => module.distTask);
});

// default task starts subtasks
gulp.task('default', autoTasksNames, () => {
  // config = _.extend {}, webpackConfig

  // # Start a webpack-dev-server.
  // webpackConfig.entry.app.unshift('webpack-dev-server/client?http://localhost:8082/');
  // webpackConfig.output.publicPath = `js/`;
  // const devServer = new WebpackDevServer(webpack(webpackConfig),
  //   {
  //     contentBase: 'dev/',
  //     hot: true,
  //     watchOptions: {
  //       aggregateTimeout: 10
  //     },
  //     noInfo: false,
  //     stats: { colors: true }
  //   }
  // );

  // devServer.listen(8082, '0.0.0.0', error => {
  //   if (error) { console.log('error webpack', error); }
  // });

  browserSync.get('dev').init({
    proxy: 'localhost:8080',
    open: false
  });
});

gulp.task('dist', distTasksNames, () => {
  browserSync.get('dist').init({
    server:
    {
      baseDir: './dist/'
    },
    open: false
  });
});



// coffe webpack + gulp


// gulp = require('gulp')
// browserSync = require('browser-sync')

// gulp.task 'browser-sync', ['webpack:dev-server'], ->
//   browserSync(
//     proxy: "localhost:8081"
//     port: 8080
//   )




// gulp = require('gulp')
// gutil = require('gulp-util')
// WebpackDevServer = require("webpack-dev-server")
// webpackConfig = require("../../../webpack.config.js")
// _ = require('underscore')
// webpack = require("webpack")

// gulp.task "webpack:dev-server", ['css'], (callback) ->
//   config = _.extend {}, webpackConfig

//   # Start a webpack-dev-server.
//   devServer = new WebpackDevServer(webpack(config),
//     contentBase: './public/'
//     hot: true
//     watchDelay: 10
//     noInfo: true
//     stats: { colors: true }
//   )
//   devServer.listen 8081, "0.0.0.0", (err) ->
//     throw new gutil.PluginError("webpack-dev-server", err) if err
//     callback()

//   return