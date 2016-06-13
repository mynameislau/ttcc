export const getMainUser = (groups) => {
  const userList = groups.get('userList');
  const user = userList.get(groups.get('mainUserID'));

  return user;
};

export const getMainUsername = (groups) => {
  const user = getMainUser(groups);

  return user ? user.get('username') : '';
};

export const userExists = (username, userList) =>
  userList.filter(entry => entry.get('username') === username).size > 0;

export const restaurantExists = (restaurantName, restaurants) =>
  restaurants.get(restaurantName);

export const isInRestaurant = (restaurant, targetID) => {
  return restaurant
  .get('users')
  .filter(userID => userID === targetID)
  .size;
};

export const isLogged = (userID, userList) => {
  return userList
  .filter(user => user.get('userID') === userID && user.get('registered') === true)
  .size;
};

export const isRestaurantEmpty = (restaurant) =>
  restaurant.get('users').size <= 0;

export const reduceUserListToUser = (userList, userID) => userList.reduce((prev, curr) => {
  return curr.get('userID') === userID ? curr : prev;
});