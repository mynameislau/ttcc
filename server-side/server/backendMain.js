'use strict';

var _socketServer = require('./socketServer');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../dev/index.html'));
// });

app.get('/config/', function (req, res) {
  res.send(JSON.stringify({
    port: app.get('port')
  }));
});

app.set('port', process.env.PORT || 5000);
app.use(_express2.default.static('dev'));

var server = app.listen(app.get('port'), function () {
  return console.log('listening on port ' + app.get('port'));
});
(0, _socketServer.startSocketServer)(server);