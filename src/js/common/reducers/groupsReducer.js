import Immutable from 'immutable';

import {
  REMOVE_USER_FROM_RESTAURANT,
  ADD_RESTAURANT,
  ADD_USER_TO_RESTAURANT,
  SET_USERNAME,
  SET_MAIN_USER,
  UPDATE_SERVER_STATE,
  DELETE_RESTAURANT
} from '../actions/actions';

const defaultState = Immutable.Map({
  restaurants: Immutable.Map(),
  mainUserID: null,
  userList: Immutable.List()
});


const removeUserFromRestaurant = (state, restaurantName, userID) =>
  state.updateIn(['restaurants', restaurantName, 'users'], users =>
    users.filter(user => user !== userID)
  );


const setUsername = (state, userID, username) => {
  console.log('coté client', username, userID);

  return state;
};

const addRestaurant = (state, restaurantName, creatorID) => {
  console.log('add restaurant (remote)', restaurantName, creatorID);

  return state;
};

const setMainUser = (state, userID) => {
  console.log('setting user id', userID);

  return state.set('mainUserID', userID);
};


const updateServerState = (state, serverState) => {
  console.log('server state update', serverState);

  return state.set('userList', Immutable.fromJS(serverState.userList))
  .set('restaurants', Immutable.fromJS(serverState.restaurants));
};

const addUserToRestaurant = (state, restaurantName, userID) => {
  console.log('add user to restaurant (remote)', restaurantName, userID);

  return state;
};

const deleteRestaurant = (state, restaurantName) => {
  console.log('deleteRestaurant (remote)', restaurantName);

  return state;
};

export default (state = defaultState, action) => {
  switch (action.type) {

  case SET_USERNAME:
    return setUsername(state, action.userID, action.username);

  case ADD_RESTAURANT:
    return addRestaurant(state, action.restaurantName, action.creatorID);

  case REMOVE_USER_FROM_RESTAURANT:
    return removeUserFromRestaurant(state, action.restaurantName, state.get('mainUserID'));

  case ADD_USER_TO_RESTAURANT:
    return addUserToRestaurant(state, action.restaurantName, state.get('mainUserID'));

  case SET_MAIN_USER:
    return setMainUser(state, action.user);

  case UPDATE_SERVER_STATE:
    return updateServerState(state, action.serverState);

  case DELETE_RESTAURANT:
    return deleteRestaurant(state, action.restaurantName);

  default:
    return state;

  }
};
