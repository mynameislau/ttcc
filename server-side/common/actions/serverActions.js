'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CREATE_USER = exports.CREATE_USER = 'CREATE_USER';
var DELETE_USER = exports.DELETE_USER = 'DELETE_USER';

var deleteUser = exports.deleteUser = function deleteUser(userID) {
  return {
    type: DELETE_USER,
    userID: userID
  };
};

var createUser = exports.createUser = function createUser() {
  return {
    type: CREATE_USER
  };
};