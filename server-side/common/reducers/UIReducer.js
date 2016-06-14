'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _UIActions = require('../actions/UIActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = _immutable2.default.Map({
  namePromptState: 'visible'
});

var setNamePromptState = function setNamePromptState(state, modalState) {
  return state.set('namePromptState', modalState);
};

exports.default = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? defaultState : arguments[0];
  var action = arguments[1];

  switch (action.type) {

    case _UIActions.TOGGLE_USERNAME_MODAL:
      return setNamePromptState(state, action.modalState);

    default:
      return state;

  }
};