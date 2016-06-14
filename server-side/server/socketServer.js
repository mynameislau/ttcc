'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startSocketServer = undefined;

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _redux = require('redux');

var _serverReducer = require('../common/reducers/serverReducer');

var _serverReducer2 = _interopRequireDefault(_serverReducer);

var _serverActions = require('../common/actions/serverActions');

var _logging = require('../common/logging');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startSocketServer = exports.startSocketServer = function startSocketServer(server) {
  var io = new _socket2.default(server);

  var emitMiddleware = function emitMiddleware(store) {
    return function (next) {
      return function (action) {
        if (action.emit) {
          // io.emit('stateChanged', store.getSt);
        }

        return next(action);
      };
    };
  };

  var loggingMiddleware = function loggingMiddleware(store) {
    return function (next) {
      return function (action) {
        (0, _logging.logAction)(action);

        return next(action);
      };
    };
  };

  var store = (0, _redux.createStore)(_serverReducer2.default, undefined, (0, _redux.compose)((0, _redux.applyMiddleware)(emitMiddleware), (0, _redux.applyMiddleware)(loggingMiddleware)));

  store.subscribe(function () {
    (0, _logging.logStateChange)(store.getState());
    io.emit('serverStateChanged', store.getState());
  });

  io.on('connection', function (socket) {
    console.log('new user connecting');
    store.dispatch((0, _serverActions.createUser)());
    var userList = store.getState().get('userList');
    var newUserID = userList.get(userList.size - 1).get('userID');

    socket.emit('userSuccessfullyCreated', newUserID);
    // io.emit('stateChanged', store.getState());

    socket.on('clientAction', function (action) {
      console.log('action with side effects sent from client', action);
      store.dispatch(action);
    });

    socket.on('disconnect', function () {
      console.log('disconnecting socket');
      store.dispatch((0, _serverActions.deleteUser)(newUserID));
    });
  });
};