'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getMainUser = exports.getMainUser = function getMainUser(groups) {
  var userList = groups.get('userList');
  var user = userList.get(groups.get('mainUserID'));

  return user;
};

var getMainUsername = exports.getMainUsername = function getMainUsername(groups) {
  var user = getMainUser(groups);

  return user ? user.get('username') : '';
};

var userExists = exports.userExists = function userExists(username, userList) {
  return userList.filter(function (entry) {
    return entry.get('username') === username;
  }).size > 0;
};

var restaurantExists = exports.restaurantExists = function restaurantExists(restaurantName, restaurants) {
  return restaurants.get(restaurantName);
};

var isInRestaurant = exports.isInRestaurant = function isInRestaurant(restaurant, targetID) {
  return restaurant.get('users').filter(function (userID) {
    return userID === targetID;
  }).size;
};

var getUser = exports.getUser = function getUser(userID, userList) {
  return userList.find(function (user) {
    return user.get('userID') === userID;
  });
};

var getUserRestaurant = exports.getUserRestaurant = function getUserRestaurant(userID, restaurants) {
  return restaurants.find(function (restaurant) {
    return restaurant.get('users').find(function (currUserID) {
      return currUserID === userID;
    });
  });
};

var isLogged = exports.isLogged = function isLogged(userID, userList) {
  return userList.filter(function (user) {
    return user.get('userID') === userID && user.get('registered') === true;
  }).size;
};

var isRestaurantEmpty = exports.isRestaurantEmpty = function isRestaurantEmpty(restaurant) {
  return restaurant.get('users').size <= 0;
};

var reduceUserListToUser = exports.reduceUserListToUser = function reduceUserListToUser(userList, userID) {
  return userList.reduce(function (prev, curr) {
    return curr.get('userID') === userID ? curr : prev;
  });
};

var getNewUniqueID = exports.getNewUniqueID = function getNewUniqueID(userList) {
  var userWithHighestID = userList.reduce(function (prev, curr) {
    return Number(prev.get('userID')) > Number(curr.get('userID')) ? prev : curr;
  });

  return userWithHighestID ? Number(userWithHighestID.get('userID')) + 1 : 0;
};

var getRestaurantUsersDiff = exports.getRestaurantUsersDiff = function getRestaurantUsersDiff(oldRestaurant, newRestaurant) {
  return {
    removedUsers: oldRestaurant.get('users').filter(function (oldUserID) {
      return !newRestaurant.get('users').find(function (newUserID) {
        return newUserID === oldUserID;
      });
    }),
    addedUsers: newRestaurant.get('users').filter(function (newUserID) {
      return !oldRestaurant.get('users').find(function (oldUserID) {
        return oldUserID === newUserID;
      });
    })
  };
};