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
  (userList.filter(entry => entry.get('name') === username).size > 0);

export const restaurantExists = (restaurantName, restaurants) =>
  restaurants.get(restaurantName);

