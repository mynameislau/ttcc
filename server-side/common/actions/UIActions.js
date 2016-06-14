'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TOGGLE_USERNAME_MODAL = exports.TOGGLE_USERNAME_MODAL = 'TOGGLE_USERNAME_MODAL';

var toggleUsernameModal = exports.toggleUsernameModal = function toggleUsernameModal(modalState) {
  return {
    type: TOGGLE_USERNAME_MODAL,
    modalState: modalState
  };
};