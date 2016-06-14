'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _actions = require('../actions/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = _immutable2.default.Map({
  restaurants: _immutable2.default.Map(),
  mainUserID: null,
  userList: _immutable2.default.List()
});

var removeUserFromRestaurant = function removeUserFromRestaurant(state, restaurantName, userID) {
  return state.updateIn(['restaurants', restaurantName, 'users'], function (users) {
    return users.filter(function (user) {
      return user !== userID;
    });
  });
};

var setUsername = function setUsername(state, userID, username) {
  console.log('coté client', username, userID);

  return state;
};

var addRestaurant = function addRestaurant(state, restaurantName, creatorID) {
  console.log('add restaurant (remote)', restaurantName, creatorID);

  return state;
};

var setMainUser = function setMainUser(state, userID) {
  console.log('setting user id', userID);

  return state.set('mainUserID', userID);
};

var updateServerState = function updateServerState(state, serverState) {
  console.log('server state update', serverState);

  return state.set('userList', _immutable2.default.fromJS(serverState.userList)).set('restaurants', _immutable2.default.fromJS(serverState.restaurants));
};

var addUserToRestaurant = function addUserToRestaurant(state, restaurantName, userID) {
  console.log('add user to restaurant (remote)', restaurantName, userID);

  return state;
};

var deleteRestaurant = function deleteRestaurant(state, restaurantName) {
  console.log('deleteRestaurant (remote)', restaurantName);

  return state;
};

exports.default = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? defaultState : arguments[0];
  var action = arguments[1];

  switch (action.type) {

    case _actions.SET_USERNAME:
      return setUsername(state, action.userID, action.username);

    case _actions.ADD_RESTAURANT:
      return addRestaurant(state, action.restaurantName, action.creatorID);

    case _actions.REMOVE_USER_FROM_RESTAURANT:
      return removeUserFromRestaurant(state, action.restaurantName, state.get('mainUserID'));

    case _actions.ADD_USER_TO_RESTAURANT:
      return addUserToRestaurant(state, action.restaurantName, state.get('mainUserID'));

    case _actions.SET_MAIN_USER:
      return setMainUser(state, action.user);

    case _actions.UPDATE_SERVER_STATE:
      return updateServerState(state, action.serverState);

    case _actions.DELETE_RESTAURANT:
      return deleteRestaurant(state, action.restaurantName);

    default:
      return state;

  }
};