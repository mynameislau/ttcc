'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _groupsReducer = require('./groupsReducer');

var _groupsReducer2 = _interopRequireDefault(_groupsReducer);

var _UIReducer = require('./UIReducer');

var _UIReducer2 = _interopRequireDefault(_UIReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  groups: _groupsReducer2.default,
  UI: _UIReducer2.default
});