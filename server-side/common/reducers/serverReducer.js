'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _actions = require('../actions/actions');

var _serverActions = require('../actions/serverActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = _immutable2.default.Map({
  restaurants: _immutable2.default.Map(),
  userList: _immutable2.default.List()
});

var removeUserFromAllRestaurants = function removeUserFromAllRestaurants(state, userID) {
  return state.update('restaurants', function (restaurants) {
    return restaurants.map(function (restaurant) {
      return restaurant.update('users', function (users) {
        return users.filter(function (user) {
          return user !== userID;
        });
      });
    });
  });
};

var removeUserFromRestaurant = function removeUserFromRestaurant(state, restaurantName, userID) {
  return state.updateIn(['restaurants', restaurantName, 'users'], function (users) {
    return users.filter(function (user) {
      return user !== userID;
    });
  });
};

var createUser = function createUser(state) {
  var newUser = _immutable2.default.Map({
    username: 'anonymous',
    registered: false,
    userID: state.get('userList').size
  });

  return state.update('userList', function (userList) {
    return userList.push(newUser);
  });
};

var deleteUser = function deleteUser(state, userID) {
  return removeUserFromAllRestaurants(state, userID).update('userList', function (userList) {
    return userList.filter(function (user) {
      return user.get('userID') !== userID;
    });
  });
};

var setUsername = function setUsername(state, userID, username) {
  return state.update('userList', function (userList) {
    return userList.map(function (userListEntry) {
      if (userListEntry.get('userID') === userID) {
        return userListEntry.set('username', username).set('registered', true);
      } else {
        return userListEntry;
      }
    });
  });
};

var addUserToRestaurant = function addUserToRestaurant(state, restaurantName, userID) {
  var newState = removeUserFromAllRestaurants(state, userID);

  return newState.updateIn(['restaurants', restaurantName, 'users'], function (users) {
    return users.push(parseInt(userID));
  });
};

var addRestaurant = function addRestaurant(state, restaurantName, creatorID) {
  if (!state.get('restaurants').get(restaurantName)) {
    var newRestaurant = _immutable2.default.Map({ name: restaurantName, users: _immutable2.default.List() });
    var newRestaurants = _immutable2.default.Map().set(restaurantName, newRestaurant);
    var newState = state.mergeIn(['restaurants'], newRestaurants);

    return addUserToRestaurant(newState, restaurantName, creatorID);
  }

  return state;
};

var deleteRestaurant = function deleteRestaurant(state, restaurantName) {
  return state.update('restaurants', function (restaurants) {
    return restaurants.filter(function (restaurant) {
      return restaurant.get('name') !== restaurantName;
    });
  });
};

exports.default = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? defaultState : arguments[0];
  var action = arguments[1];

  switch (action.type) {

    case _serverActions.CREATE_USER:
      return createUser(state);

    case _serverActions.DELETE_USER:
      return deleteUser(state, action.userID);

    case _actions.SET_USERNAME:
      return setUsername(state, action.userID, action.username);

    case _actions.ADD_RESTAURANT:
      return addRestaurant(state, action.restaurantName, action.creatorID);

    case _actions.REMOVE_USER_FROM_RESTAURANT:
      return removeUserFromRestaurant(state, action.restaurantName, action.userID);

    case _actions.ADD_USER_TO_RESTAURANT:
      return addUserToRestaurant(state, action.restaurantName, action.userID);

    case _actions.DELETE_RESTAURANT:
      return deleteRestaurant(state, action.restaurantName);

    default:
      return state;

  }
};