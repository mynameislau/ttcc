'use strict';

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _redux = require('redux');

var _serverReducer = require('./reducers/serverReducer');

var _serverReducer2 = _interopRequireDefault(_serverReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const io = new _socket2.default().attach(8090);

const users = [];

// Add the reducer to your store on the `routing` key
const store = (0, _redux.createStore)(_serverReducer2.default);

io.on('connection', socket => {
  console.log('connection');
  users.push(users.length);
  io.emit('state', store.getState());
});