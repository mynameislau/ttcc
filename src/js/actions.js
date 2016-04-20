export const REMOVE_USER_FROM_RESTAURANT = 'REMOVE_USER_FROM_RESTAURANT';
export const ADD_RESTAURANT = 'ADD_RESTAURANT';
export const ADD_USER_TO_RESTAURANT = 'ADD_USER_TO_RESTAURANT';
export const CREATE_USER = 'CREATE_USER';
export const SET_USERNAME = 'SET_USERNAME';

export const addRestaurant = restaurantName => ({
  type: ADD_RESTAURANT,
  restaurantName: restaurantName,
  remote: true
});

export const addUserToRestaurant = restaurantName => ({
  type: ADD_USER_TO_RESTAURANT,
  restaurantName: restaurantName,
  remote: true
});

export const removeUserFromRestaurant = restaurantName => ({
  type: REMOVE_USER_FROM_RESTAURANT,
  restaurantName: restaurantName,
  remote: true
});

export const setUsername = username => ({
  type: SET_USERNAME,
  username: username,
  remote: true
});
