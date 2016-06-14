'use strict';

var _socketServer = require('./socketServer');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _socketServer.startSocketServer)().then(function () {
  console.log('socket server started');

  var app = (0, _express2.default)();

  /*app.get('/', function (req, res) {
    res.send('Hello World!');
  });*/

  app.use(_express2.default.static('dev'));

  var httpPort = 4567;
  app.listen(httpPort, function () {
    console.log('http server listening on port ! ' + httpPort);
  });
});