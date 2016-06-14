'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var REMOVE_USER_FROM_RESTAURANT = exports.REMOVE_USER_FROM_RESTAURANT = 'REMOVE_USER_FROM_RESTAURANT';
var ADD_RESTAURANT = exports.ADD_RESTAURANT = 'ADD_RESTAURANT';
var ADD_USER_TO_RESTAURANT = exports.ADD_USER_TO_RESTAURANT = 'ADD_USER_TO_RESTAURANT';
var CREATE_USER = exports.CREATE_USER = 'CREATE_USER';
var SET_USERNAME = exports.SET_USERNAME = 'SET_USERNAME';
var UPDATE_SERVER_STATE = exports.UPDATE_SERVER_STATE = 'UPDATE_SERVER_STATE';
var SET_MAIN_USER = exports.SET_MAIN_USER = 'SET_MAIN_USER';
var DELETE_RESTAURANT = exports.DELETE_RESTAURANT = 'DELETE_RESTAURANT';

var setMainUser = exports.setMainUser = function setMainUser(user) {
  return {
    type: SET_MAIN_USER,
    user: user
  };
};

var updateServerState = exports.updateServerState = function updateServerState(serverState) {
  return {
    type: UPDATE_SERVER_STATE,
    serverState: serverState
  };
};

var addRestaurant = exports.addRestaurant = function addRestaurant(restaurantName, creatorID) {
  return {
    type: ADD_RESTAURANT,
    restaurantName: restaurantName,
    creatorID: creatorID,
    remote: true
  };
};

var addUserToRestaurant = exports.addUserToRestaurant = function addUserToRestaurant(restaurantName, userID) {
  return {
    type: ADD_USER_TO_RESTAURANT,
    restaurantName: restaurantName,
    userID: userID,
    remote: true
  };
};

var removeUserFromRestaurant = exports.removeUserFromRestaurant = function removeUserFromRestaurant(restaurantName, userID) {
  return {
    type: REMOVE_USER_FROM_RESTAURANT,
    restaurantName: restaurantName,
    userID: userID,
    remote: true
  };
};

var setUsername = exports.setUsername = function setUsername(username, userID) {
  return {
    type: SET_USERNAME,
    username: username,
    userID: userID,
    remote: true,
    emit: true
  };
};

var deleteRestaurant = exports.deleteRestaurant = function deleteRestaurant(restaurantName) {
  return {
    type: DELETE_RESTAURANT,
    restaurantName: restaurantName,
    remote: true
  };
};