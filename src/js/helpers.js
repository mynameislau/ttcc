export const getMainUser = (state) => {
  const userList = state.get('userList');
  const user = userList.get(state.get('mainUserID'));
  return user;
};

export const getMainUsername = (state) => {
  const user = getMainUser(state);
  return user ? user.get('username') : '';
};

export const userExists = (username, userList) =>
  (userList.filter(entry => entry.get('username') === username).size > 0);

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
