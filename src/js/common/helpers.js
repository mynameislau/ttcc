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

export const getUser = (userID, userList) =>
  userList.find(user =>
    user.get('userID') === userID
  );

export const getUserRestaurant = (userID, restaurants) =>
  restaurants.find(restaurant =>
    restaurant.get('users').find(currUserID =>
      currUserID === userID
    )
  );

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

export const getNewUniqueID = (userList) => {
  const userWithHighestID = userList.reduce((prev, curr) => {
    return Number(prev.get('userID')) > Number(curr.get('userID')) ? prev : curr;
  });

  return userWithHighestID ? Number(userWithHighestID.get('userID')) + 1 : 0;
};

export const getRestaurantUsersDiff = (oldRestaurant, newRestaurant) => ({
  removedUsers: oldRestaurant.get('users').filter(oldUserID =>
    !newRestaurant.get('users').find(newUserID => newUserID === oldUserID)
  ),
  addedUsers: newRestaurant.get('users').filter(newUserID =>
      !oldRestaurant.get('users').find(oldUserID => oldUserID === newUserID)
    )
});
