export const REMOVE_USER_FROM_RESTAURANT = 'REMOVE_USER_FROM_RESTAURANT';
export const ADD_RESTAURANT = 'ADD_RESTAURANT';
export const ADD_USER_TO_RESTAURANT = 'ADD_USER_TO_RESTAURANT';
export const CREATE_USER = 'CREATE_USER';
export const SET_USERNAME = 'SET_USERNAME';
export const UPDATE_SERVER_STATE = 'UPDATE_SERVER_STATE';
export const SET_MAIN_USER = 'SET_MAIN_USER';
export const DELETE_RESTAURANT = 'DELETE_RESTAURANT';

export const setMainUser = user => ({
  type: SET_MAIN_USER,
  user: user
});

export const updateServerState = serverState => ({
  type: UPDATE_SERVER_STATE,
  serverState: serverState
});

export const addRestaurant = (restaurantName, creatorID) => ({
  type: ADD_RESTAURANT,
  restaurantName: restaurantName,
  creatorID: creatorID,
  remote: true
});

export const addUserToRestaurant = (restaurantName, userID) => ({
  type: ADD_USER_TO_RESTAURANT,
  restaurantName: restaurantName,
  userID: userID,
  remote: true
});

export const removeUserFromRestaurant = (restaurantName, userID) => ({
  type: REMOVE_USER_FROM_RESTAURANT,
  restaurantName: restaurantName,
  userID: userID,
  remote: true
});

export const setUsername = (username, userID) => ({
  type: SET_USERNAME,
  username: username,
  userID: userID,
  remote: true,
  emit: true
});

export const deleteRestaurant = (restaurantName) => ({
  type: DELETE_RESTAURANT,
  restaurantName: restaurantName,
  remote: true
});
