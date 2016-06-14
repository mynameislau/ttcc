'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logStateChange = exports.logAction = undefined;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logAction = exports.logAction = function logAction(action) {
  console.log(_chalk2.default.grey('///////////////////'));
  console.log(_chalk2.default.grey(action.type), action);
};

var logStateChange = exports.logStateChange = function logStateChange(state) {
  console.log(_chalk2.default.white.bgGreen.bold('server state changed !'));
  console.log(state.toString());
};