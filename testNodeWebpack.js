'use strict';

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');


// # Start a webpack-dev-server.
webpackConfig.entry.unshift('webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server');
// webpackConfig.output.publicPath = `/build/`;

console.log(webpackConfig);
const devServer = new WebpackDevServer(webpack(webpackConfig),
  {
    contentBase: 'dev/',
    hot: true,
    watchOptions: {
      aggregateTimeout: 10
    },
    noInfo: false,
    stats: { colors: true }
  }
);

devServer.listen(8080, '0.0.0.0', error => {
  if (error) { console.log('error webpack', error); }
});
